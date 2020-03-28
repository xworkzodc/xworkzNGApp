import { PageData } from './../model/page-data';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, of, observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Student } from '../model/student';
import { Page } from '../model/page';
// import 'rxjs/add/operator/mapc';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  getBatchStatus() {
    return this.httpClient.get(environment.apiUrl+"getBatchStatusArr");
  }
 


  changeTshirtStatus(employeeId: any) {
    return this.httpClient.put(environment.apiUrl+'updateStudentTshirtDataById/'+employeeId,{observe:'response',responseType:'json'});
  }
  upadateBatchDataService(value: any) {
    return this.httpClient.put(environment.apiUrl+'updateBatchData',value, {responseType:'json',observe:'response'});
  }
  
  saveBatchData(value: any) : Observable<any> {
    // console.log(value);
    return this.httpClient.post(environment.apiUrl+'saveBatchData',value,{observe:'response',responseType:'json'}).pipe(map(response=>{
      if(!response){

      }
      return response
    }),
    catchError(errorObj=>{
      console.log("errorObj");
      if(errorObj && errorObj.error){
        console.log(errorObj);
        // return errorObj.status;
      }
      return null;
    })
    )
  }
  updateBatchStatusById(batchId: any) {
    return this.httpClient.put(environment.apiUrl +'updateBatchStatusById/', {'batchId':batchId} , {observe : "response", responseType:'json'} );
  }
  getAllBatchesData() {
    return this.httpClient.get(environment.apiUrl+'getAllBatchData');
 }

  constructor(private httpClient: HttpClient) { }
  companyData: any[];
  getAllBatches(){
    return this.httpClient.get(environment.apiUrl+'getAllBatch');
  }

  getStudByBranchName(batchName){
    return this.httpClient.get(environment.apiUrl+'getEmpByBatchName/'+batchName);
  }

  updateEmpStatusByEmpId(empId): Observable<any>{
    return this.httpClient.put(environment.apiUrl+'updateEmpStatusById',{'empId': empId},{observe:'response',responseType:'text'});
  }
  getAllStuduentData(page){
    return of(this.companyData).pipe(map(d => this.getPagedData(page)));
  }

  getPagedData(page:Page){
    const pagedData = new PageData<Student>();
   return this.httpClient.get(environment.apiUrl+'getStudentsByOffset/'+page.pageNumber);
    // return null;
  }

  getBySearchData(searchData){
    // console.log('my data '+searchData);
    return this.httpClient.get(environment.apiUrl+'getStudentsBySearchData/'+searchData);
  }

  getBatchNamesByStudId(studentId){
    return this.httpClient.get(environment.apiUrl+"getBatchByStudentId/"+studentId);
  }

  getAllNonBatchByStudId(studentId){
    return this.httpClient.get(environment.apiUrl+"getAllBatchNameWtotStudIdByStudId/"+studentId);
  }

  addBatchData(batchName, stId){
    var map = {
      "studentId":stId,
      "batchName":batchName
    }
    console.log(map);
    return this.httpClient.post(environment.apiUrl+'addStudentBatch',map,{observe:'response',responseType:'json'});
  }

  deleteBatchDetailByStuId(studentId,batchId){
    var data = {
      "studentId":studentId,
      "batchId":batchId
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
      body: data
  };
    return this.httpClient.delete(environment.apiUrl+'deleteBatchByStId' ,  httpOptions );
  }
}
