import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  getStudByDateNbtchNm(date: any, num: number, batchName: any) {
    return this.httpClient.get(environment.apiUrl+"/api/v1/attendence/getByDtNBtchNmNNum?num="+num+"&batchName="+batchName+"&date="+date);
  }
  searchByDateNBatchName(data) {
    return this.httpClient.get(environment.apiUrl+'/api/v1/attendence/getByDateNBtchName?batchName='+data.batchName+'&date='+data.date);
  }
  getActiveStudentAttendence() {
    return this.httpClient.get(environment.apiUrl +"/api/v1/attendence/getAllStudentAttInfo");
  }

  constructor(private httpClient: HttpClient) { }
}
