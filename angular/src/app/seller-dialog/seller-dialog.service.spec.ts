import { TestBed } from '@angular/core/testing';

import { SellerDialogService } from './seller-dialog.service';

describe('SellerDialogService', () => {
  let service: SellerDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
