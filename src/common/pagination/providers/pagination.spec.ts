import { Test, TestingModule } from '@nestjs/testing';
import { Pagination } from './providers/pagination';

describe('Pagination', () => {
  let provider: Pagination;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Pagination],
    }).compile();

    provider = module.get<Pagination>(Pagination);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
