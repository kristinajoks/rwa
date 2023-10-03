import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseFilesController } from './database-files.controller';

describe('DatabaseFilesController', () => {
  let controller: DatabaseFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseFilesController],
    }).compile();

    controller = module.get<DatabaseFilesController>(DatabaseFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
