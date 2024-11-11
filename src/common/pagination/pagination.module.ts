import { Module } from '@nestjs/common';
import { PaginationController } from './pagination.controller';
import { Pagination } from './providers/pagination';

@Module({
  controllers: [PaginationController],
  providers: [Pagination],
  exports:[Pagination]
})
export class PaginationModule {}
