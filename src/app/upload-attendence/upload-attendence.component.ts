import { UploadExcelAttService } from './../service/upload-excel-att.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-attendence',
  templateUrl: './upload-attendence.component.html',
  styleUrls: ['./upload-attendence.component.css']
})
export class UploadAttendenceComponent implements OnInit {
  attData: FormGroup;
  uploadAttTxt: any;
  constructor(private formBuilder : FormBuilder , private uploadExcel : UploadExcelAttService) { 
    this.attData = formBuilder.group({
      xlsFile : new FormControl(null,[Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
  }


  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      if(file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type == 'application/vnd.ms-excel'){
        this.attData.patchValue({
          fileSource: file
        });   
        // let fileName = file.name
        // this.attData.controls['xlsFile'].patchValue(fileName);


      }else{
        this.attData.controls['xlsFile'].patchValue( null);
      }

    }
  }
  get getAttData(){
    return this.attData.controls;
  }
  
  ngOnInit(): void {
  }



  updateAtt(){
    console.log(this.attData.controls);
    this.uploadExcel.uploadAttExcelData(this.attData).subscribe(data=>{
      if(data!=null){
        this.uploadAttTxt = data.resTxt;
      }
        
      
    });
  }
}
