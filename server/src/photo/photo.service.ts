import { Injectable } from '@nestjs/common'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import * as urlsafeBase64 from 'urlsafe-base64'
import * as isBase64 from 'is-base64'

@Injectable()
export class PhotoService {
  public async uploadPhoto(key: string, imageFile: string) {
    if (!isBase64(imageFile, { allowMime: true })) {
      return imageFile
    }

    const decode_data = urlsafeBase64.decode(
      imageFile.replace('data:image/jpeg;base64,', '')
    )

    const s3Client = new S3Client({ region: process.env.AWS_REGION })
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${key}.jpg`,
      Body: decode_data,
      ContentType: 'image/jpeg',
    }
    try {
      await s3Client.send(new PutObjectCommand(uploadParams))

      return this.getPhotoUrl(`${key}.jpg`)
    } catch (err) {
      throw new Error()
    }
  }

  private getPhotoUrl(fileName: string) {
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
  }
}
