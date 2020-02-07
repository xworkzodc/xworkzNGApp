import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentBatchComponent } from './add-student-batch.component';

describe('AddStudentBatchComponent', () => {
  let component: AddStudentBatchComponent;
  let fixture: ComponentFixture<AddStudentBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
