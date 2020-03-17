import { FormBuilder } from '@angular/forms';
import { BatchService } from './../service/batch.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ColumnMode } from '../../../node_modules/@swimlane/ngx-datatable/public-api';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
// interface myInterface{
//   bName:string;
// }

export class StudentsComponent implements OnInit {

  student = this.formbuilder.group({
    selectData:['',[]] 
  });
  // selectData;
  rows: any = [];
  dropdownOptions:any =[];
  // ColumnMode = ColumnMode;
  reorderable = true;
  isLoading:true;
  constructor(private batchService:BatchService , private route:Router, private formbuilder :FormBuilder) { }
  config = {
    // displayKey:"bName", //if objects array passed which key to be displayed defaults to description
    search:true ,//true/false for the search functionlity defaults to false,
    height: 'auto' ,//height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: this.dropdownOptions.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search' ,// label thats displayed in search input,
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    
  }
  ngOnInit() {
    this.getAllBatches();
    // this.getAllStudents();
  }


  changeStatus(row){
    this.batchService.updateEmpStatusByEmpId(row.employeeId).subscribe(rs =>{
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

  changeTshirtStatus(row){
    if(confirm("did trainee got t-shirt?")){
    this.batchService.changeTshirtStatus(row.employeeId).subscribe(rs =>{
      // if(rs.status==200){
        console.log(rs);
        if(rs==1)
        // if(row.isGtTshrt== true){
          row.isGtTshrt = true;
        // }else{
        //   row.isGtTshrt = true;
        // }
      // }
    });
      // console.log('yes');
    }
  
  }

  getStudentById(employeeId){
    // console.log(employeeId);
    this.route.navigate(['/studentData'],{queryParams: {'stId':employeeId}});
  }

  onActivate(e){
    // console.log(e);
    e.isActive = false;
  }

  getAllBatches(){
    this.batchService.getAllBatches().subscribe(data =>{
     
      this.dropdownOptions=data;
      // console.log(data);
    });
  }
 

  selectionChanged(data){
    this.batchService.getStudByBranchName(data.value).subscribe(data=>{
      this.rows = data;
    });
  }
}
