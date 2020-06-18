import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendementComponent } from './rendement.component';

describe('RendementComponent', () => {
  let component: RendementComponent;
  let fixture: ComponentFixture<RendementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
