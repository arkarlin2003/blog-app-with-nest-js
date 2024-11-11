import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/posts.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/provider/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { Pagination } from 'src/common/pagination/providers/pagination';
import { GetPostsDto } from '../dtos/get-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly paginationProvider: Pagination,

  ) {}
  public async createPost(creaetPostDto: CreatePostDto) {
    let user = await this.usersService.findOne({ userId: 1 });
    let tag = await this.tagsService.findMany(1);
    let newPost = await this.postRepository.create({
      ...creaetPostDto,
      user: user,
      tags: tag,
    });
    return await this.postRepository.save(newPost);
  }

  public async getPosts(getPostsDto:GetPostsDto){
    return this.paginationProvider.paginateQuery(getPostsDto,this.postRepository)
  }

  public async getPost(postId: number) {
    return await this.postRepository.findOne({ where: { id: postId } });
  }

  public async getUserPosts(userId: number) {
    const userPosts = await this.usersService.findOne({ userId: userId });
    return userPosts;
  }

  public async delete(postId: number) {
    await this.postRepository.delete({ id: postId });
    return 'deleted post';
  }
}
