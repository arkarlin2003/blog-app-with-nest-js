import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUserDto } from '../dtos/get-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import userConfig from '../config/user.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(userConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof userConfig>,
  ) {}

  public async findOne(getUserDto: GetUserDto) {
    return await this.userRepository.findOne({
      where: { id: getUserDto.userId },
    });
  }

  public async createUser(createUserDto: CreateUserDto) {
    let existUser = undefined;

    try {
      existUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (existUser)
      throw new BadRequestException(
        'The user already exists, please check your email.',
      );

    let newUser = await this.userRepository.create(createUserDto);

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }

    return newUser;
  }

  public async deleteUser(userId: number) {
    await this.userRepository.delete(userId);
    return 'deleted user';
  }
}
