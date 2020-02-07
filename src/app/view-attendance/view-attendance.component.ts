import { BatchService } from './../service/batch.service';
import { AttendenceService } from './../service/attendence.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {

  constructor(private attendenceService : AttendenceService , private batchService: BatchService) { }

  @Input()
  table:any;
  rows:any =[];
  temp:any=[];
  ngOnInit() {
    this.getActiveStudentAttendence();

  }

  getActiveStudentAttendence(){
    alert('HI.....');
    // console.log("DIVYESh".toLowerCase().indexOf('mh') !== -1 || "DIVYESh".toLowerCase().indexOf('vyesss') !== -1 || !'DIVYESh');
    this.attendenceService.getActiveStudentAttendence().subscribe(data=>{
      // console.log("----------- data ----------   ")
      // console.log(data);
      this.rows = data;
      this.temp = data;
    });
  }




  updateFilter(event) {
    const val = event.target.value.toLowerCase();
// console.log(val);
    // filter our data
    
    const temp = this.temp.filter(function(d) {
      // console.log((d.stName.toLowerCase().indexOf(val) !== -1) || (d.batchName.toLowerCase().indexOf(val) !== -1)  || (d.courseName.toLowerCase().indexOf(val) !== -1)  || !val );
      // return (d.stName.toLowerCase().indexOf(val) !== -1) || (d.batchName.toLowerCase().indexOf(val) !== -1)  || (d.courseName.toLowerCase().indexOf(val) !== -1)  || !val ;
      var stName = d.stName ? d.stName.toLowerCase() : '';
      var batchName = d.batchName ? d.batchName.toLowerCase() : '';
      var courseName = d.courseName ? d.courseName.toLowerCase() : '';
      // console.log( stName + ' -- '+ batchName + " -- "+courseName);
      return (stName.indexOf(val) !== -1) || (batchName.indexOf(val) !== -1) || courseName.indexOf(val) !== -1 ||!val;
    });



    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  changeBatchStatus(row){
    console.log(row);
    this.batchService.updateEmpStatusByEmpId(row.id).subscribe(rs =>{
      console.log(rs.status);
      if(rs.status==200){
        if(row.isActive== true){
          row.isActive = false;
        }else{
          row.isActive = true;
        }
      }
    });
  }
 }
