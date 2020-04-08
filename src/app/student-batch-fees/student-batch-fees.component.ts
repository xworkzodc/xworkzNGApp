import { StudentDataService } from './../service/student-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-batch-fees',
  templateUrl: './student-batch-fees.component.html',
  styleUrls: ['./student-batch-fees.component.css']
})
export class StudentBatchFeesComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private studService:StudentDataService) { }
  table:any;
  rows: any = [];
  batchName="";
  stName="";
  ngOnInit(): void {
    let stId= this.activeRoute.snapshot.queryParamMap.get('studentId');
    let batchName= this.activeRoute.snapshot.queryParamMap.get('batchName');
    console.log(stId);
    console.log(batchName);
    this.studService.getStuTrasactionByIdNBtchNm(stId,batchName).subscribe(data=>{
      console.log(data);
      this.rows = data;
      this.batchName = batchName;
      this.stName = data[0].empName;
    });
  }

}
