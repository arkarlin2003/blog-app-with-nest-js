import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO31661Alpha2,
  IsISO8601,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreaetMetaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsISO8601()
  @Optional()
  createdAt?: Date;

  @ApiProperty()
  @IsISO8601()
  @Optional()
  updatedAt?: Date;
}
