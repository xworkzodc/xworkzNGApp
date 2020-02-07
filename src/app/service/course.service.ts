import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  getAllCourseNames() {
    return this.httpClient.get(environment.apiUrl+'getAllCourseNames')
  }
  updateCourse(courseId: number, courseName: string, fee: any) {
    var data = {
      'courseId' : courseId ,
      'courseName' : courseName,
      'fee' : fee
    }
   return  this.httpClient.put(environment.apiUrl+'updateCourseDetails' , data,{observe:'response', responseType : 'json'})
  }
  saveNewCourseDetails(courseName: any, fee: any) {
    var data = {
      'courseName':courseName,
      'fee':fee
    }
    return this.httpClient.post(environment.apiUrl +'saveCourse', data,{observe:'response', responseType: 'json'});
  }

  getAllCourse() {
    return this.httpClient.get(environment.apiUrl+'getAllCourse');
  }

  constructor(private httpClient: HttpClient) { }

}
