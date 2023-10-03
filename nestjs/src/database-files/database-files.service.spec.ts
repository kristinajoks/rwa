import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseFilesService } from './database-files.service';

describe('DatabaseFilesService', () => {
  let service: DatabaseFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseFilesService],
    }).compile();

    service = module.get<DatabaseFilesService>(DatabaseFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
