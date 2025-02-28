import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorstCaseComponent } from './worst-case.component';

describe('WorstCaseComponent', () => {
  let component: WorstCaseComponent;
  let fixture: ComponentFixture<WorstCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorstCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorstCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
