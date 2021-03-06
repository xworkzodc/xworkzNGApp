import { Page } from './../model/page';
import { Router } from '@angular/router';
import { BatchService } from './../service/batch.service';
import { AttendenceService } from './../service/attendence.service';
import { Component, OnInit, Input } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {

  constructor(private attendenceService : AttendenceService , private batchService: BatchService , private router : Router) { 
    this.page.pageNumber = 0;
    this.page.size = 20;
  }
  search;
  isAtt=true;
  page = new Page();
  tempPage=new Page();
  // @Input()
  table:any;
  rows:any =[];
  temp:any=[];
  batchName='';
  
  ngOnInit() {
    this.setPage({ offset: 0 });

    // this.getActiveStudentAttendence();

  }

  searchData(event){
    console.log("calling..............................");
    const val = event.target.value.toLowerCase();
    // console.log('anoaishd '+searchData.length);
    console.log(val);
    if(val.length>3){
      this.rows=[];
      this.page=new Page();
      console.log("getSearchByData........");
      console.log(val.value);
      this.getSearchByData(val);
    }
    if(val.length<3){
      this.rows = this.temp;
      this.page = this.tempPage;
    }
  }

  getSearchByData(searchData){
    this.attendenceService.searchByBtchRmCrsNmRStNm(searchData).subscribe(data=>{
      // conso le.log(data);
      this.rows = data;
      this.page=new Page();
      let dt:any = data;
      this.page.totalElements=dt.length;
      this.page.size=dt.length;
    });
  }

  pageData:any;
  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.attendenceService.getActiveStudentAttendenceWithPagination(this.page).subscribe(data=>{
      // console.log("----------- data ----------   ")
      // console.log(data);
      this.rows = data[1];
      this.page.totalElements= data[0];
      if(pageInfo.offset==0){
        this.temp=data[1];
        this.tempPage = this.page;
      }

    });
    this.isAtt = true;

        
  }

  getActiveStudentAttendence(){
    // alert('HI.....');
    // console.log("DIVYESh".toLowerCase().indexOf('mh') !== -1 || "DIVYESh".toLowerCase().indexOf('vyesss') !== -1 || !'DIVYESh');
    this.attendenceService.getActiveStudentAttendence().subscribe(data=>{
      // console.log("----------- data ----------   ")
      // console.log(data);
      this.rows = data;
      this.temp = data;

    });
    this.isAtt = true;
  }



  model:any;
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
  console.log(val);
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
    this.isAtt = true;  
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

  searchByDateNbatchName(batchName){
 
    if(batchName.length!=0 && this.model!=null){
      console.log(batchName+'  -------------------------------  ');
      console.log(this.model);
      var month = this.model.month<10 ? '0'+this.model.month : this.model.month;
      this.batchName = batchName;
      let data = {
        'batchName':batchName,
        'date':this.model.year+'-'+month+'-'+this.model.day
      }
      this.attendenceService.searchByDateNBatchName(data).subscribe(data=>{
        console.log(data);
        console.log("comming.......");
        this.isAtt=false;
          let d =[ {
            "totalPresent" : data[1],
            "totalAbsent" : data[2],
            "total": data[0]
          }]
        this.rows = d;
      });
  
    }
  }

  getStudsAttByDtNBtch(num){
    console.log(num);
    console.log('batch name is '+this.batchName);
    var date = this.model.year+'-'+(this.model.month<10 ? '0'+this.model.month : this.model.month)+'-'+this.model.day
    console.log('date is '+this.model.year+'-'+this.model.month+'-'+this.model.day);
    sessionStorage.setItem("batchName", this.batchName);
    sessionStorage.setItem("number", num);
    sessionStorage.setItem("date",date);
    this.router.navigate(["/studentsAttByDate"])
  }
 }

