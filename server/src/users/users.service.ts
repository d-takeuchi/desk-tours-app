import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.entity'
import { EditUserDto } from './dto/edit-user.dto'
import axios from 'axios'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async create(user: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.create({
      ...user,
      password: await bcrypt.hash(user.password, 12),
    })
    return await this.userRepository.save(createdUser)
  }

  public async edit(id: string, { name, icon }: EditUserDto) {
    const targetUser = await this.userRepository.findOne(id, {
      relations: ['posts', 'likes'],
    })

    if (!targetUser) {
      throw new NotFoundException('ユーザーが見つかりませんでした')
    }

    return this.userRepository.save({ ...targetUser, name, icon })
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne(
      { email },
      {
        relations: ['posts', 'posts.likes', 'likes'],
      },
    )

    if (!user) {
      throw new NotFoundException('ユーザーが見つかりませんでした')
    }

    return user
  }

  public async toBase64Url(url: string): Promise<string> {
    const image = await axios.get(url, { responseType: 'arraybuffer' })
    const raw = Buffer.from(image.data).toString('base64')
    return 'data:' + image.headers['content-type'] + ';base64,' + raw
  }
}
