import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysemanagerComponent } from './analysemanager.component';

describe('AnalysemanagerComponent', () => {
  let component: AnalysemanagerComponent;
  let fixture: ComponentFixture<AnalysemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
