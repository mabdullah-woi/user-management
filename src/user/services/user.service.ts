import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareHash, hashPassword } from 'src/common/utils/hash.util';
import { TokenService } from 'src/token/services/token.service';
import * as uuid from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

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

    const passwordHash = await hashPassword(createUserDto.password);

    const newUser = this.userRepository.create({
      id: uuid.v4(),
      ...createUserDto,
      password: passwordHash,
      authSource: ['local'],
      createdAt: new Date(),
    });

    await this.userRepository.save(newUser);

    return { data: newUser };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: loginDto.email })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw new HttpException(
        'Email or password is incorrect.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Compare the hashed password.
    const isValid = await compareHash(loginDto.password, user.password);

    if (!isValid) {
      throw new HttpException(
        'Email or password is incorrect.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Generate tokens and send back a response.
    const accessToken = await this.tokenService.accessToken(user);
    const refreshToken = await this.tokenService.refreshToken(user);

    return { data: { accessToken, refreshToken } };
  }

  async refreshTokens(tokenId: string, userId: string) {
    // Check if token exists via tokenId and is not expired.
    const isTokenValid = await this.tokenService.isRefreshTokenValid(tokenId);

    // Remove token reference from the database - we redirect the user to authenticate again or send back new tokens, so RT is redundant in either case.
    await this.tokenService.removeRefreshTokenFromDatabase(tokenId);

    if (!isTokenValid) {
      throw new HttpException(
        'Refresh token has expired or is invalid.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    // Generate tokens and send back a response.
    const accessToken = await this.tokenService.accessToken(user);
    const refreshToken = await this.tokenService.refreshToken(user);

    return { data: { accessToken, refreshToken } };
  }

  async logout(tokenId: string) {
    // Remove token reference from the database. Not checking existence in the database because it is a redundant read operation for our purpose.
    await this.tokenService.removeRefreshTokenFromDatabase(tokenId);

    return { data: { success: true } };
  }
}
