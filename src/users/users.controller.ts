import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GetUserDto } from './dtos/get-user.dto';
import { UsersService } from './provider/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from 'src/posts/providers/posts.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Get('/:userId')
  getUser(@Param() getUserDto: GetUserDto) {
    return this.usersService.findOne(getUserDto);
  }

  @Get('/:userId/posts')
  getUserPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.getUserPosts(userId);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
