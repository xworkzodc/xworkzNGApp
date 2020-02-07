import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  updateTrainerData(trId: number, trainerName: string, emailId: string) {
    var data = {
      'trId': trId,
      'trainerName':trainerName,
      'emailId':emailId
    }

    return this.httpClient.put(environment.apiUrl+'updateTrainerDetails',data,{observe:'response', responseType:'json'});
  }

  addTrainerDetails(trainerData: any) {
    console.log("Trainer Data is "+JSON.stringify(trainerData));
    return this.httpClient.post(environment.apiUrl+'addTrainerDetails',trainerData,{observe:'response',responseType:'json'});
  }
  
  
  addBatchToTrainer(empId: number, batchName: any) {
    var map = {
      "trainerId":empId,
      "batchName":batchName
    }
    console.log(map);
    return this.httpClient.post(environment.apiUrl+'addTrainerBatch',map,{observe:'response',responseType:'json'});
  }
  getAllNewBatchByTrainerId(empId: number) {
    return this.httpClient.get(environment.apiUrl + "getAllBatchAcceptCurrentBatchByTrainerId/"+empId)
  }

  constructor(private httpClient: HttpClient) { }
  
  getAllTrainers(){
    return this.httpClient.get(environment.apiUrl+'getAllTrainers');
  }


  getBatchDetailsByTrainerId(id){
    return this.httpClient.get(environment.apiUrl+'getBatchDetailsByTrainerId/'+id);
  }

  getStudentsByBatchId(batchNo){
    return this.httpClient.get(environment.apiUrl+'getEmployeeByBatchId/'+batchNo);
  }


}
