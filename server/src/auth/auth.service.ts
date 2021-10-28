import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDataDto } from './dto/login-data.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser({ email, password }: LoginDataDto) {
    const user = await this.usersService.findOne(email);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('invalid credentials');
    }
    return isValid;
  }

  async login(loginData: LoginDataDto) {
    if (await this.validateUser(loginData)) {
      const payload = {
        email: loginData.email,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
