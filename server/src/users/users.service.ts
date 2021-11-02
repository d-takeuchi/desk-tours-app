import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 12),
    });
    return await this.userRepository.save(createdUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne(
      { email },
      { relations: ['posts', 'likes'] },
    );

    if (!user) {
      throw new NotFoundException('ユーザーが見つかりませんでした');
    }

    return user;
  }
}
