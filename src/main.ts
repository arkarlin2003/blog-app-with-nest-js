import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {SwaggerModule,DocumentBuilder} from "@nestjs/swagger"
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * validation global
   */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions:{
      enableImplicitConversion:true
    }
  }));

  /**
   * swagger configuration 
   */
  const config = new DocumentBuilder()
    .setTitle('NestJs Masterclass - Blog app API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PUBLIC_PORT ?? 3000);
}
bootstrap();
