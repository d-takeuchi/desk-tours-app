import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { User } from './users.entity'
import { EditUserDto } from './dto/edit-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(
    @Body(ValidationPipe) createUser: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUser)
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  public edit(
    @Param('id') id: string,
    @Body(ValidationPipe) editUser: EditUserDto,
  ) {
    return this.usersService.edit(id, editUser)
  }

  @Get(':email')
  @UseGuards(AuthGuard('jwt'))
  public findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email)
  }
}
