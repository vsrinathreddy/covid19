import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseEntryComponent } from './case-entry.component';

describe('CaseEntryComponent', () => {
  let component: CaseEntryComponent;
  let fixture: ComponentFixture<CaseEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
