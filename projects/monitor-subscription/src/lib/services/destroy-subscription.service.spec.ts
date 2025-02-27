import { TestBed } from '@angular/core/testing';

import { DestroySubscriptionService } from './destroy-subscription.service';

describe('DestroySubscriptionService', () => {
  let service: DestroySubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestroySubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
