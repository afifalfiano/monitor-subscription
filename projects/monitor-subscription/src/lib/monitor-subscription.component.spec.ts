import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSubscriptionComponent } from './monitor-subscription.component';

describe('MonitorSubscriptionComponent', () => {
  let component: MonitorSubscriptionComponent;
  let fixture: ComponentFixture<MonitorSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorSubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
