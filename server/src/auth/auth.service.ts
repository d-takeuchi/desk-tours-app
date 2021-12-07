import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcryptjs'
import { Repository } from 'typeorm'

import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/users.entity'
import { LoginDataDto } from './dto/login-data.dto'
import { Request } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async validateUser({
    email,
    password,
  }: LoginDataDto): Promise<boolean> {
    const user = await this.usersService.findByEmail(email)

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid || !user.emailVerifiedAt) {
      throw new UnauthorizedException('invalid credentials')
    }
    
    return true
  }

  public async login(loginData: LoginDataDto): Promise<string> {
    if (await this.validateUser(loginData)) {
      const payload = {
        email: loginData.email,
      }
      return this.jwtService.sign(payload)
    }
  }

  public async googleLogin(req: any): Promise<string> {
    if (!req.user) {
      throw new UnauthorizedException('invalid credentials')
    }

    const { email, firstName, lastName, picture } = req.user
    const user = await this.usersService.findByEmail(email)

    //ユーザーがusersテーブルに存在しない場合は、作成する
    if (!user) {
      await this.usersService.create({
        name: lastName + firstName,
        email,
        password: '11111111',
        icon: await this.usersService.toBase64Url(picture),
      })
    }

    const payload = {
      email: req.user.email,
    }

    return this.jwtService.sign(payload)
  }

  public async getLoginUser(req: Request) {
    const token = req.cookies.access_token

    if (!token) {
      throw new UnauthorizedException(
        'No JWT exist: may not set yet or deleted',
      )
    }

    const payload = this.jwtService.decode(token) as any

    return await this.usersService.findByEmail(payload.email)
  }
}
