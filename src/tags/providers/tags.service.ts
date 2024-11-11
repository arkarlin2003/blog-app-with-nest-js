import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    let tag = await this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  public async findMany(tagId: number) {
    return await this.tagRepository.find({ where: { id: tagId } });
  }
}
