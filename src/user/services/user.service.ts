import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    const users = await this.userRepository.find();

    return { count: users.length, data: users };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(`User not found.`, HttpStatus.NOT_FOUND);
    }

    return { data: user };
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new HttpException(
        'A user with this email already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // TODO: Hash password.

    const newUser = this.userRepository.create({
      id: uuid.v4(),
      ...createUserDto,
      authSource: ['local'],
      createdAt: new Date(),
    });

    await this.userRepository.save(newUser);

    return { data: newUser };
  }
}
