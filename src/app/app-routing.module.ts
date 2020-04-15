import { UploadAttendenceComponent } from './upload-attendence/upload-attendence.component';
import { StudentBatchFeesComponent } from './student-batch-fees/student-batch-fees.component';
import { StudAttDataComponent } from './stud-att-data/stud-att-data.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ViewBatchComponent } from './view-batch/view-batch.component';
import { StudentDataComponent } from './student-data/student-data.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewTrainerComponent } from './view-trainer/view-trainer.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { StudentsComponent } from './students/students.component';
import { AddStudentBatchComponent } from './add-student-batch/add-student-batch.component';
import { AddBatchComponent } from './add-batch/add-batch.component';


const routes: Routes = [
  {component: HomeComponent , path:''},
  {component:ViewTrainerComponent , path:'viewTrainer'},
  {component:StudentsComponent , path:'viewStudents'},
  {component:ViewAttendanceComponent , path:'viewAttendance'},
  {component:AddTrainerComponent , path:'addTrainer'},
  {component:StudentDataComponent , path:'studentData'},
  {component: AddStudentBatchComponent , path:'addStudentBatch' },
  {component:AddBatchComponent , path:'addBatch'},
  {component:ViewBatchComponent, path:'viewBatch'} ,
  {component: CourseDetailsComponent , path:'courseDetails'},
  {component:StudAttDataComponent, path:'studentsAttByDate'},
  {component:StudentBatchFeesComponent , path:'studBatchFees'} ,
  {component : UploadAttendenceComponent , path:'uploadAttendence'}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
