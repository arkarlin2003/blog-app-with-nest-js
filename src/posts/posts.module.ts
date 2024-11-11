import { forwardRef, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/posts.entity';
import { Meta } from 'src/metas/entities/metas.entity';
import { UsersModule } from 'src/users/users.module';
import { Tag } from 'src/tags/entities/tags.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports:[PaginationModule,TypeOrmModule.forFeature([Post,Meta,Tag]),forwardRef(()=>UsersModule),forwardRef(()=> TagsModule)],
  exports:[PostsService]
})
export class PostsModule {}
