import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailModule } from 'src/email/email.module';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),EmailModule],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
