import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './provider/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PostsModule } from 'src/posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import userConfig from './config/user.config';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule) , forwardRef(()=>PostsModule),ConfigModule.forFeature(userConfig)],
  exports: [UsersService],
})
export class UsersModule {}
