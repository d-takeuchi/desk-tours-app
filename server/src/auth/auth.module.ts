import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/entities/users.entity'

import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { TwitterStrategy } from './twitter.strategy'

@Module({
  imports: [
    JwtModule.register({
      secret: 'sjgaohgakhahhayja@ha@jkajja@fa',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TwitterStrategy],
})
export class AuthModule {}
