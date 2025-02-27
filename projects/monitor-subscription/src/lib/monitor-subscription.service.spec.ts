import { TestBed } from '@angular/core/testing';

import { MonitorSubscriptionService } from './monitor-subscription.service';

describe('MonitorSubscriptionService', () => {
  let service: MonitorSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitorSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
