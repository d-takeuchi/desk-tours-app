import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EmailModule } from 'src/email/email.module'
import { PhotoModule } from 'src/photo/photo.module'
import { UsersController } from './users.controller'
import { User } from './entities/users.entity'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule, PhotoModule],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
