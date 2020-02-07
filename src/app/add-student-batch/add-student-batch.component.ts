import { Router } from '@angular/router';
import { StudentDataService } from './../service/student-data.service';
import { Page } from './../model/page';
import { BatchService } from './../service/batch.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { $ } from 'jquery';

@Component({
  selector: 'app-add-student-batch',
  templateUrl: './add-student-batch.component.html',
  styleUrls: ['./add-student-batch.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AddStudentBatchComponent implements OnInit {
  isAddBatch=false;
  page = new Page();
  dropdownOptions:any =[];
  // rows = new Array<Student>();
  rows: any = [];
  temp:any =[];
  tempPage=new Page();
  batchData:any=[];
  studentDetails : any = [];
  studentData:any=[];
  @Input('isActive')
  isActive= false;
  
  constructor(private formBuilder: FormBuilder , private batchService:BatchService, private modalService: NgbModal , private studentService : StudentDataService, private route:Router) { 
    this.page.pageNumber = 0;
    this.page.size = 20;

  }


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
    this.setPage({ offset: 0 });

    this.studentData = new FormGroup({
      'studentId':new FormControl(''),
      'firstName': new FormControl(''),
      'lastname': new FormControl(''),
      'email': new FormControl(''),
      'contactNo': new FormControl(''),
      'alternateCntNo': new FormControl(''),
      'isActive' : new FormControl('',[Validators.required])
    });

    
  }
  pageData:any;
  setPage(pageInfo){
    this.page.pageNumber = pageInfo.offset;
    this.batchService.getPagedData(this.page).subscribe(
      data=>{
        this.rows = data[1];
        this.page.totalElements= data[0];
        if(pageInfo.offset==0){
          this.temp=data[1];
          this.tempPage = this.page;
        }

      }

    );    
  }

  
  searchData(searchData){
    // console.log("calling..............................");
    // console.log(searchData);
    // console.log('anoaishd '+searchData.length);
    if(searchData.length>3){
      this.rows=[];
      this.page=new Page();
      this.getSearchByData(searchData);
    }
    if(searchData.length<3){
      this.rows = this.temp;
      this.page = this.tempPage;
    }
  }

  getSearchByData(searchData){
    this.batchService.getBySearchData(searchData).subscribe( data => {
      // console.log('asdasdasd '+data);
      this.rows= data[1];
      this.page.totalElements=data[0];
      this.page.size=data[1].length;
    });
  }
  getStudentDetails(student){
    // console.log(student);
    this.studentData.controls.firstName.setValue(student.employeeFn);
    this.studentData.controls.lastname.setValue(student.employeeLn);
    this.studentData.controls.isActive.setValue(student.isActive? "1":"0");
    this.studentData.controls.studentId.setValue(student.employeeId);
    this.studentData.controls.email.setValue(student.email);
    this.studentData.controls.contactNo.setValue(student.contactNo);
    this.studentData.controls.alternateCntNo.setValue(student.alternatContactNo);

    this.studentData.controls.firstName.value = student.employeeFn;

    this.batchService.getBatchNamesByStudId(student.employeeId).subscribe(data=>{
       this.batchData = data;
     });

     
  }
  stId=0;
  batchName='';
  addBatchStudent(studentId){
    this.stId = studentId;
    this.isAddBatch = true;
    this.batchService.getAllNonBatchByStudId(studentId).subscribe(data=>{
      this.dropdownOptions = data;
    });
  }
  selectionChanged(event){
    this.batchName = event.value;
  }

  addBatch(){
    
    if(this.batchName!=null && this.batchName.length>0 && this.stId!=0){
      var c=confirm('do you really want to add batch?')
      if(c==true){
         this.batchService.addBatchData(this.batchName,this.stId).subscribe(data=>{
           console.log(data);
           if(data.status == 201){
            this.batchService.getBatchNamesByStudId(this.stId).subscribe(data=>{
              this.batchData = data;
            });
             document.getElementById('clsStAddBtc').click();
           }
         }); 
      }
    }
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
  
  deleteBatchById(studentId,batchId){
    // console.log(studentId);
    // console.log(batchId);
    this.batchService.deleteBatchDetailByStuId(studentId,batchId).subscribe(rs =>{
      console.log(rs);
      if(rs == true){
        this.batchService.getBatchNamesByStudId(this.stId).subscribe(data=>{
          this.batchData = data;
        });
      }
    });
  }

  updateStudent(studentData){
      this.studentService.updateStudentData(studentData.value).subscribe(data=>{
        if(data.status==200){
          this.setPage({offset:this.page.pageNumber});
          document.getElementById("stDataId").click();
        }
      },
      response=>{
        
        if(response.status != 200){
          alert('data is not updated, please try again.....');
        }
      });
  }

  viewStudentDetails(data){
    console.log(data);
    this.route.navigate(['/studentData'],{queryParams:{'stId':data.employeeId}});
  }

}
 