import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployedashComponent } from './employedash.component';

describe('EmployedashComponent', () => {
  let component: EmployedashComponent;
  let fixture: ComponentFixture<EmployedashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployedashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
