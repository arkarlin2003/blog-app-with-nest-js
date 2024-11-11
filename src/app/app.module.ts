import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './providers/app.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';
import { PostsModule } from 'src/posts/posts.module';
import { MetasModule } from 'src/metas/metas.module';
import { TagsModule } from 'src/tags/tags.module';
import appConfig from 'src/config/app.config';
import enviromentValidation from 'src/config/enviroment.validation';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PostsModule,
    MetasModule,
    TagsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig, appConfig],
      validationSchema: enviromentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        port: configService.get('database.port'),
        host: configService.get('database.host'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
