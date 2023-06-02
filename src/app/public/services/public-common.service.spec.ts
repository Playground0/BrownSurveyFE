import { TestBed } from '@angular/core/testing';

import { PublicCommonService } from './public-common.service';

describe('PublicCommonService', () => {
  let service: PublicCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
