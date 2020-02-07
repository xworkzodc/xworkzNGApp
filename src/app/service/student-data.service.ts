import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  updateStudentFees(stId: number, fee: number , courseId:number) {
    var data = {
        'stId':stId,
        'fee': fee,
        'courseId':courseId
    };
   return this.httpClient.put(environment.apiUrl+'updateStudFeesById', data , {observe : 'response' , responseType: 'json'});
   
  }

  constructor(private httpClient : HttpClient) { }

  getStudBatch(stId){
    return this.httpClient.get(environment.apiUrl+'getBatchesByStudentId/'+stId);
  }

  updateStudentData(studentData){
    // console.log('data came here...........'+studentData);
    return this.httpClient.put(environment.apiUrl+'updateStudentData',studentData,{observe:'response' , responseType:'text'});
  }
}
