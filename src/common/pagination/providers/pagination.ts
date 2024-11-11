import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class Pagination {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    let results = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });
    const totalItems = await repository.count();

    let finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        currentPage: paginationQuery.page,
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / paginationQuery.limit),
      },
    };

    return finalResponse;
  }
}
