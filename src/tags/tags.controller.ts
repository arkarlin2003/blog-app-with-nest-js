import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
}
