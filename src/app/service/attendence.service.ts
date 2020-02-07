import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  getActiveStudentAttendence() {
    return this.httpClient.get(environment.apiUrl +"/api/v1/attendence/getAllStudentAttInfo");
  }

  constructor(private httpClient: HttpClient) { }
}
