import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentWrapComponent } from './component-wrap.component';

describe('ComponentWrapComponent', () => {
  let component: ComponentWrapComponent;
  let fixture: ComponentFixture<ComponentWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentWrapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
