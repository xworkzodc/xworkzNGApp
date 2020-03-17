import { AttendenceService } from './../service/attendence.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stud-att-data',
  templateUrl: './stud-att-data.component.html',
  styleUrls: ['./stud-att-data.component.css']
})
export class StudAttDataComponent implements OnInit {

  constructor(private attendenceService : AttendenceService ) { }
  attType;
  date;
  batchName;
  rows:any =[];
  table:any;
  ngOnInit(): void {
    this.date = sessionStorage.getItem('date');
    let num:number = parseInt(sessionStorage.getItem('number'));
    this.batchName = sessionStorage.getItem('batchName');
    if(num == 1 ){
      this.attType = "All Student"
    }else if(num == 2){
      this.attType = "Present"
    }else if(num == 3){
      this.attType ="Absent"
    }
    this.getStudAttData(this.date , num ,this.batchName );
  }
  getStudAttData(date: any, num: number, batchName: any) {
    this.attendenceService.getStudByDateNbtchNm(date , num ,batchName).subscribe(data =>{
      console.log(data)
      this.rows = data;
    });
  }

}
