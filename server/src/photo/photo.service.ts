import { Injectable } from '@nestjs/common'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import * as urlsafeBase64 from 'urlsafe-base64'

import { Post } from 'src/posts/post.entity'

@Injectable()
export class PhotoService {
  public async uploadPhoto(post: Post, imageFile: string) {
    const decode_data = urlsafeBase64.decode(
      imageFile.replace('data:image/jpeg;base64,', '')
    )

    const s3Client = new S3Client({ region: process.env.AWS_REGION })
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${post.id}.jpg`,
      Body: decode_data,
      ContentType: 'image/jpeg',
    }
    try {
      await s3Client.send(new PutObjectCommand(uploadParams))

      return this.getPhotoUrl(`${post.id}.jpg`)
    } catch (err) {
      console.log(err)
      throw new Error()
    }
  }

  private getPhotoUrl(fileName: string) {
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
  }
}
