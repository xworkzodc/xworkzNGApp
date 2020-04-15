import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadExcelAttService {

  constructor(private httpClient: HttpClient) { }

  uploadAttExcelData(data){
    console.log(data);
    var formData: any = new FormData();
    formData.append("fileName",data.get('xlsFile').value);
    formData.append("file",data.get('fileSource').value);
    console.log(formData);
    return this.httpClient.post(environment.apiUrl+'/api/v1/attendence/uploadXlsAttData', formData, {observe : "response", responseType:'json'});
  }
}
