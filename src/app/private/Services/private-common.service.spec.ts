import { TestBed } from '@angular/core/testing';

import { PrivateCommonService } from './private-common.service';

describe('PrivateCommonService', () => {
  let service: PrivateCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
