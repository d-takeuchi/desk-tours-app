import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'

import { User } from 'src/users/entities/users.entity'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'
import { GoogleLoginDataDto } from './dto/google-login-data.dto'
import { LoginDataDto } from './dto/login-data.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('login')
  public async login(
    @Body(ValidationPipe) loginData: LoginDataDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<User> {
    const jwt = await this.authService.login(loginData)
    res.cookie('access_token', jwt, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    return await this.usersService.findByEmail(loginData.email)
  }

  @Post('googleLogin')
  public async googleLogin(
    @Body(ValidationPipe) loginData: GoogleLoginDataDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<User> {
    const jwt = await this.authService.googleLogin(loginData)
    res.cookie('access_token', jwt, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    return await this.usersService.findByEmail(loginData.email)
  }

  @Get('csrfToken')
  public createCsrfToken(@Req() req: Request) {}

  @Post('logout')
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    res.cookie('access_token', '', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
  }

  @Get('getLoginUser')
  @UseGuards(AuthGuard('jwt'))
  public getLoginUser(@Req() req: Request) {
    return this.authService.getLoginUser(req)
  }

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  public async twitterAuth(@Req() req) {}

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  public async twitterAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const jwt = await this.authService.twitterLogin(req)
    res.cookie('access_token', jwt, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    res.redirect(process.env.FRONT_APP_URL)
  }
}
