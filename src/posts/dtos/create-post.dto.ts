import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreaetMetaDto } from 'src/metas/dtos/create-meta.dto';
import { Meta } from 'src/metas/entities/metas.entity';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    required: false,
  })
//   @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @Type(() => Meta)
  meta?: CreaetMetaDto;


  
}
