import { StudentDataService } from './../service/student-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';


@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,private studentDataService: StudentDataService) { }
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
      this.studentName=data[0].studentName;
    });
  }
stId=0;
fee=0;
pending=0;
  updateFees(row){
    console.log(row);
    this.stId = row.stId;
    this.fee = row.pending;
    this.pending = row.pending;
    this.studentName = row.studentName;
    this.courseId = row.courseId;
  }
  courseId=0;
  updateFeesData='';
  
  addFee(){
    if(this.stId !=null && this.fee!=null && this.courseId!=null) {
      if(this.fee !=0 && this.fee <= this.pending && this.stId != 0  && this.courseId!=0){
        this.studentDataService.updateStudentFees(this.stId , this.fee , this.courseId).subscribe(data=>{
          // console.log(data);
          this.updateFeesData = 'Fees Updated Successfully';
          this.studentData(this.stId);
          document.getElementById('closeTrainerUpdateModal').click();
          
        });
      }else if(this.fee > this.pending) {
        this.updateFeesData = 'fees cannot be more than '+this.pending;
      }
    }else{
      console.log('Fees or stId is null ');
    }
  }
}
