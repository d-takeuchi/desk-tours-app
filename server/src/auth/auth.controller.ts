import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDataDto } from './dto/login-data.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(
    @Body(ValidationPipe) loginData: LoginDataDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(loginData);
  }
}
