import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.entity'
import { EditUserDto } from './dto/edit-user.dto'
import axios from 'axios'
import { Request, Response } from 'express'
import { createHash, createHmac } from 'crypto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async create(user: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 12),
    })
    return await this.userRepository.save(createdUser)
  }

  public async edit(id: string, { name, icon }: EditUserDto) {
    const targetUser = await this.userRepository.findOne(id, {
      relations: ['posts', 'likes'],
    })

    if (!targetUser) {
      throw new NotFoundException('ユーザーが見つかりませんでした')
    }

    return this.userRepository.save({ ...targetUser, name, icon })
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne(
      { email },
      {
        relations: ['posts', 'posts.likes', 'likes'],
      },
    )

    if (!user) {
      throw new NotFoundException('ユーザーが見つかりませんでした')
    }

    return user
  }

  public async toBase64Url(url: string): Promise<string> {
    const image = await axios.get(url, { responseType: 'arraybuffer' })
    const raw = Buffer.from(image.data).toString('base64')
    return 'data:' + image.headers['content-type'] + ';base64,' + raw
  }

  public async verify(id : number, hash : string , expires:string, signature:string , req : Request , res : Response){

    //URLに含まれたユーザーIDからUserデータを取得
    const user = await this.userRepository.findOne(id)

    if(!user){
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('このURLは正しくありません')
    }else if(user.emailVerifiedAt){
      res.status(HttpStatus.ACCEPTED).send('既に本人確認済みです。ログインを続行してください。')
      // res.redirect(`${process.env.FRONT_APP_URL}/login`)
    }else{
      //URLから有効期限や
      const now = new Date()
      const tmpHash = createHash('sha1').update(user.email).digest('hex')
      const isCorrectHash = (hash === tmpHash)
      const isExpired = (now.getTime() > parseInt(expires)) 
      const verificationUrl = `${process.env.API_SERVER_URL}${req.originalUrl.split('&signature=')[0]}`
      const tmpSignature = createHmac('sha256', process.env.APP_SECRET_GENERATE_KEY).update(verificationUrl).digest('hex');
      const isCorrectSignature = (signature === tmpSignature);

      //メールアドレス、有効時間、正しいURLかをチェック
      if(!isCorrectHash || !isCorrectSignature || isExpired) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send('このURLは既に有効期限切れか、正しくありません')
      }else{
        //全てクリアしたら emailVerifiedAtに現在時間を保存
        await this.userRepository.save({ ...user, emailVerifiedAt : new Date()})
        res.status(HttpStatus.ACCEPTED).send('本人確認完了しました。ログインを続行してください。')
      }
    }
  }
}
