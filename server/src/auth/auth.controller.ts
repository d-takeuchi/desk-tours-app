import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'

import { User } from 'src/users/users.entity'
import { UsersService } from 'src/users/users.service'
import { AuthService } from './auth.service'
import { LoginDataDto } from './dto/login-data.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  public async login(
    @Body(ValidationPipe) loginData: LoginDataDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    const jwt = await this.authService.login(loginData)
    res.cookie('access_token', jwt, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'none',
    })
    return await this.usersService.findByEmail(loginData.email)
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  public async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @Redirect('http://localhost:3001')
  public async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const jwt = await this.authService.googleLogin(req)
    res.cookie('access_token', jwt, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'none',
    })
  }

  @Get('csrfToken')
  public createCsrfToken(@Req() req: Request) {
    // return { csrf_token: req.csrfToken() }
  }

  @Post('logout')
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie('access_token', '', {
      httpOnly: true,
      // secure: true,
      // sameSite: 'none',
    })
  }

  @Get('getLoginUser')
  @UseGuards(AuthGuard('jwt'))
  public getLoginUser(@Req() req: Request) {
    return this.authService.getLoginUser(req)
  }
}
