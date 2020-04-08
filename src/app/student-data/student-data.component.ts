import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentDataService } from './../service/student-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';


@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,private studentDataService: StudentDataService,private router : Router) { }
  rows: any = [];
  studentName;
  ngOnInit() {
    let stId= this.activeRoute.snapshot.queryParamMap.get('stId');
    this.studentData(stId);    
  }

  studentData(stId){
    this.studentDataService.getStudBatch(stId).subscribe(data =>{
      console.log(data);
      this.rows = data;
      this.studentName=data[0].empName;
    });
  }
stId=0;
fee=0;
pending:number=0;
model;
updateStudBatchFees = new FormGroup({
  stId: new FormControl('',[Validators.required]),
  batchName: new FormControl('',[Validators.required]),
  paying : new FormControl(0,[Validators.required,Validators.pattern('[0-9]*'), Validators.max(this.pending)]),
  transNum: new FormControl('',[Validators.required]),
  paidDate : new FormControl('',[Validators.required]),
  pending: new FormControl('',[Validators.required])
});
batchName='';
  updateFees(row){
    console.log(row);
    this.stId = row.empId;
    this.fee = row.totalPending;
    this.pending = row.totalPending;
    this.studentName = row.studentName;
    this.batchName=row.batchName;

    this.updateStudBatchFees = new FormGroup({
      stId: new FormControl('',[Validators.required]),
      batchName: new FormControl('',[Validators.required]),
      paying : new FormControl(0,[Validators.required,Validators.pattern('[0-9]*'), Validators.max(this.pending),Validators.min(500)]),
      transNum: new FormControl('',[Validators.required]),
      paidDate : new FormControl('',[Validators.required]),
      pending: new FormControl('',[Validators.required,Validators.pattern('[0-9]*')])
    });
  }
  courseId=0;
  updateFeesData='';
  
  // addFee(){
  //   if(this.stId !=null && this.fee!=null && this.courseId!=null) {
  //     if(this.fee !=0 && this.fee <= this.pending && this.stId != 0  && this.courseId!=0){
  //       this.studentDataService.updateStudentFees(this.stId , this.fee , this.courseId).subscribe(data=>{
  //         // console.log(data);
  //         this.updateFeesData = 'Fees Updated Successfully';
  //         this.studentData(this.stId);
  //         document.getElementById('closeTrainerUpdateModal').click();
          
  //       });
  //     }else if(this.fee > this.pending) {
  //       this.updateFeesData = 'fees cannot be more than '+this.pending;
  //     }
  //   }else{
  //     this.updateFeesData = 'fees cannot be empty';
  //     console.log('Fees or stId is null ');
  //   }
  // }

  isValidUpdateFees=false;
  getStuTransactionByBatch(data){
    console.log(data);
    this.router.navigate(['/studBatchFees'],{queryParams:{'studentId':data.empId , 'batchName':data.batchName}});
  }

  updateStBtchFeesData(){
    // this.studentDataService.updateStudentFees(this.updateStudBatchFees.value);
    // if(this.updateStudBatchFees.get(''))
    // console.log(this.updateStudBatchFees.value);
    this.studentDataService.updateStudentFees(this.updateStudBatchFees.value).subscribe(data=>{
      this.updateFeesData = 'Fees Updated Successfully';
              this.studentData(this.stId);

              document.getElementById('closeTrainerUpdateModal').click();
    });
  }

  get getupdateStudBatchFees(){
    return this.updateStudBatchFees.controls;
  }
}
