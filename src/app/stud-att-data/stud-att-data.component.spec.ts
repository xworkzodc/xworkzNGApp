import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudAttDataComponent } from './stud-att-data.component';

describe('StudAttDataComponent', () => {
  let component: StudAttDataComponent;
  let fixture: ComponentFixture<StudAttDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudAttDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudAttDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
