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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(
    @Body(ValidationPipe) createUser: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUser);
  }

  @Get()
  public findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':email')
  @UseGuards(AuthGuard('jwt'))
  public findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }
}
