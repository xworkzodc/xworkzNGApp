import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  constructor(private courseService : CourseService) { }
  rows: any = [];

  ngOnInit() {
    this.getAllCourses();
  }

  getAllCourses(){
    this.courseService.getAllCourse().subscribe(data =>{
      this.rows= data;
    });
  }
  courseName='';fee;
  courseText='';
  addBatchToTrainer(){
    console.log(this.courseName , this.fee);
    if(this.courseName!=null && this.fee != null){
      if(this.courseName.length>0 && this.fee>0){
        this.courseService.saveNewCourseDetails(this.courseName , this.fee).subscribe(data=>{
          console.log(data);
          if(data.status==201){
            document.getElementById('addCourseModal').click();
            this.courseText= this.courseName+' is successfully added......';
            this.fee='';
            this.courseName='';
            this.getAllCourses();
          }else{
            this.courseText= 'data is not added successfully..........';
          }
          

        });
      }else{
        this.courseText='course name and fee both is neccessory';
      }
    }
  }
  courseId=0;
  editDetails(data){
    console.log(data);
    this.courseId = data.courseId;
    this.courseName= data.courseName;
    this.fee = data.rate;
  }

  updateCourse(){
    if(this.courseName!=null && this.fee != null){
      if(this.courseName.length>0 && this.fee>0){
        this.courseService.updateCourse(this.courseId, this.courseName , this.fee).subscribe(data =>{
          if(data.status == 200){
            document.getElementById('updateCourseModal').click();
            this.courseText= this.courseName+' is successfully added......';
            this.fee='';
            this.courseName='';
            this.getAllCourses();
          }else{
            this.courseText= 'data is not updated successfully..........';
            
          }
        });
      }else{
        this.courseText='course name and fee both is neccessory';
      }
    }else{
      this.courseText='course name and fee both is neccessory';
    }
  }
}