import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/provider/users.service';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public async register(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  public async login(loginDto:LoginDto){
    return loginDto;
  }
}
