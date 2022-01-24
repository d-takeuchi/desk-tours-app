import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { User } from './entities/users.entity'
import { EditUserDto } from './dto/edit-user.dto'
import { EmailService } from 'src/email/email.service'
import { Request, Response } from 'express'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService
  ) {}

  //ユーザー仮登録
  @Post()
  public async create(
    @Body(ValidationPipe) createUser: CreateUserDto
  ): Promise<User> {
    const user = await this.usersService.create(createUser)
    this.emailService.sendEmail(user)
    return user
  }

  //本人確認処理
  @Get('verify/:id/:hash')
  public verify(
    @Param('id') id: number,
    @Param('hash') hash: string,
    @Query('expires') expires: string,
    @Query('signature') signature: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    return this.usersService.verify(id, hash, expires, signature, req, res)
  }

  //ユーザープロフィール更新
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  public edit(
    @Param('id') id: string,
    @Body(ValidationPipe) editUser: EditUserDto
  ) {
    return this.usersService.edit(id, editUser)
  }

  //1ユーザー取得処理
  @Get(':email')
  @UseGuards(AuthGuard('jwt'))
  public findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email)
  }
}
