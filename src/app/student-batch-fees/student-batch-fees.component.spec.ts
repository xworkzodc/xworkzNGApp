import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBatchFeesComponent } from './student-batch-fees.component';

describe('StudentBatchFeesComponent', () => {
  let component: StudentBatchFeesComponent;
  let fixture: ComponentFixture<StudentBatchFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBatchFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBatchFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
