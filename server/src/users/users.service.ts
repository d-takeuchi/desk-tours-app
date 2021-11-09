import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async create(user: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 12),
    });
    return await this.userRepository.save(createdUser);
  }

  public async edit({ name, email, icon }: EditUserDto) {
    const targetUser = await this.userRepository.findOne(
      { email },
      { relations: ['posts', 'likes'] },
    );

    if (!targetUser) {
      throw new NotFoundException('ユーザーが見つかりませんでした');
    }

    return this.userRepository.save({ ...targetUser, name, icon });
  }

  public async findByEmail(email: string): Promise<User> {
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
