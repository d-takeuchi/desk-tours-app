import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { User } from 'src/users/users.entity';

import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { LoginDataDto } from './dto/login-data.dto';

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
    const user = await this.usersService.findByEmail(email);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('invalid credentials');
    }
    return isValid;
  }

  public async login(
    loginData: LoginDataDto,
  ): Promise<{ access_token: string }> {
    if (await this.validateUser(loginData)) {
      const payload = {
        email: loginData.email,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  public async googleLogin(req: any): Promise<any> {
    const { email, firstName, lastName, picture } = req.user;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      await this.usersService.create({
        name: lastName + firstName,
        email,
        password: '11111111',
        icon: await this.usersService.toBase64Url(picture),
      });
      const payload = {
        email: req.user.email,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
