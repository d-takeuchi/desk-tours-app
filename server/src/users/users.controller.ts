import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './users.entity';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(
    @Body(ValidationPipe) createUser: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUser);
  }

  @Post('edit')
  @UseGuards(AuthGuard('jwt'))
  public edit(@Body(ValidationPipe) editUser: EditUserDto) {
    return this.usersService.edit(editUser);
  }

  @Get(':email')
  @UseGuards(AuthGuard('jwt'))
  public findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }
}
