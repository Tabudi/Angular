import { TestBed, inject } from '@angular/core/testing';

import { RaApprovalServiceService } from './ra-approval-service.service';

describe('RaApprovalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaApprovalServiceService]
    });
  });

  it('should be created', inject([RaApprovalServiceService], (service: RaApprovalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
