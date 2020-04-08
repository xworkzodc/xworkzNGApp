import { HttpClientModule } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { ViewTrainerComponent } from './view-trainer/view-trainer.component';
import { HomeComponent } from './home/home.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StudentsComponent } from './students/students.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentDataComponent } from './student-data/student-data.component';
import { AddStudentBatchComponent } from './add-student-batch/add-student-batch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { ViewBatchComponent } from './view-batch/view-batch.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudAttDataComponent } from './stud-att-data/stud-att-data.component';
import { StudentBatchFeesComponent } from './student-batch-fees/student-batch-fees.component';
// import { IgxCardModule } from 'igniteui-angular';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ViewAttendanceComponent,
    AddTrainerComponent,
    ViewTrainerComponent,
    HomeComponent,
    StudentsComponent,
    StudentDataComponent,
    AddStudentBatchComponent,
    AddBatchComponent,
    ViewBatchComponent,
    CourseDetailsComponent,
    StudAttDataComponent,
    StudentBatchFeesComponent

  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    AppRoutingModule,
    HttpClientModule,
    SelectDropDownModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    // IgxCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
