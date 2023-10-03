import { TestBed } from '@angular/core/testing';

import { DatabaseFileService } from './database-file.service';

describe('DatabaseFileService', () => {
  let service: DatabaseFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
