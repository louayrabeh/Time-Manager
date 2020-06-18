import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutprojetComponent } from './ajoutprojet.component';

describe('AjoutprojetComponent', () => {
  let component: AjoutprojetComponent;
  let fixture: ComponentFixture<AjoutprojetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutprojetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
