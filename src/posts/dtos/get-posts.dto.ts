import { IsDate, IsOptional } from 'class-validator';

import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetPostsBaseDto {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
