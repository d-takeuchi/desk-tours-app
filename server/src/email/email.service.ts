import { Injectable } from '@nestjs/common';
import { SendEmailCommand,SESClient }  from "@aws-sdk/client-ses";

import { User } from 'src/users/users.entity';
import { createHash, createHmac } from 'crypto';


@Injectable()
export class EmailService {

  private getEmailData(user:User){
    const receiverAddress = user.email//受信者アドレス
    const senderAddress = "support@desk-tour-app.com"//送信者アドレス
    const verificationUrl = this.createRegisterUrl(receiverAddress,user.id)//本登録URL
    const emailParams = {
      Destination: {
        CcAddresses: [],
        ToAddresses: [receiverAddress],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `以下のURLをクリックして本登録を完了させてください。<br>${verificationUrl}<br>リンクの有効期限は24時間となっております。`,
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: "DeskTourApp 本登録メール",
        },
      },
      Source: senderAddress,
    }
    return emailParams
  }


  //本登録URLの生成
  private createRegisterUrl(receiverAddress:string, id:number): string{
    const hash = createHash('sha1').update(receiverAddress).digest('hex')
    const now = new Date()
    const expiration = now.setHours(now.getHours() + 24)
    let verificationUrl = `${process.env.API_SERVER_URL}/users/verify/${id}/${hash}?expires=${expiration}`
    const signature = createHmac('sha256', process.env.APP_SECRET_GENERATE_KEY).update(verificationUrl).digest('hex')
    verificationUrl += '&signature='+ signature

    return verificationUrl
  }


  public async sendEmail(user:User){
    const REGION = "ap-northeast-1"
    const sesClient = new SESClient({ region: REGION })
    const params = this.getEmailData(user)
    try {
      const data = await sesClient.send(new SendEmailCommand(params))
      console.log("Success", data)
      return data
    } catch (err) {
      console.log("Error", err)
    }          
  }
}
