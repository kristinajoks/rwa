import { TestBed } from '@angular/core/testing';

import { ClosetService } from './closet.service';

describe('ClosetService', () => {
  let service: ClosetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
