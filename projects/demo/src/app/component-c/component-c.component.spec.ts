import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCComponent } from './component-c.component';

describe('ComponentCComponent', () => {
  let component: ComponentCComponent;
  let fixture: ComponentFixture<ComponentCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentCComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
