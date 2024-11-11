import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './providers/posts.service';
import { GetPostsDto } from './dtos/get-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(@Query() getPostsDto:GetPostsDto){
    return this.postsService.getPosts(getPostsDto)
  }

  @Get('/:postId')
  getPost(@Query('postId', ParseIntPipe) postId: number) {
    return this.postsService.getPost(postId);
  }

  @Post()
  createPost(@Body() creaetPostDto: CreatePostDto) {
    return this.postsService.createPost(creaetPostDto);
  }

  @Delete()
  deletePost(@Query('postId', ParseIntPipe) postId: number) {
    return this.postsService.delete(postId);
  }
}
