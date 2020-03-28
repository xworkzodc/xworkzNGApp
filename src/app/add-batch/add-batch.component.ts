import { BatchService } from './../service/batch.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from './../service/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent implements OnInit {
  dropdownOptions:any=[];
  addBatchTxt:any = '';
  model;
  batchData = new FormGroup({
    batchName:new FormControl('',[Validators.required]),
    batchType : new FormControl('',[Validators.required]),
    batchTime : new FormControl('' , [Validators.required]),
    courseName : new FormControl ('', [Validators.required]),
    totalBatches: new FormControl ('',[Validators.required, Validators.pattern('[0-9]*')]),
    startDate : new FormControl('',[Validators.required]),
    batchStatus: new FormControl('',[Validators.required])
  });
  courseText='';
  dropdownOptions1: any=[];
  constructor(private courseService: CourseService , private formBuilder : FormBuilder, private batchService:BatchService) { }
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

  config1 = {
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

  selectionBatchChanged(event){
    this.batchData.controls['batchStatus'].setValue(event.value);
  }

  getBatchStatus(){
    this.batchService.getBatchStatus().subscribe(data=>{
      this.dropdownOptions1= data;
    });
  }

  selectionChanged(event){
    this.batchData.controls['courseName'].setValue(event.value);
  }

  ngOnInit() {
    this.getAllCourseNames();
    this.getBatchStatus();
    // this.batchData.statusChanges.subscribe(data=>{
    // console.log('data is ');
    // console.log(); 
    // });

    

  }
  getAllCourseNames() {
    this.courseService.getAllCourseNames().subscribe(data=>{
      this.dropdownOptions = data;
    });
  }


  addBatch(){

    if(this.batchData.status== 'VALID')
      this.batchService.saveBatchData(this.batchData.value).subscribe(data=>{
        // console.log(data.status);
        console.log(data);
        if(data==405){
          this.addBatchTxt = "batch name is already available try with different batch name"
          // this.addBatchTxt = this.batchData.controls.batchName.value+' is not added successfully. please try again later';  
          console.log('data is not saved successfully.....................');
        }else if(data.status==201){
          // console.log(data);
          this.addBatchTxt = this.batchData.controls.batchName.value+' is added successfully..............';  
         document.getElementById('formReset').click();
        } else{
          this.addBatchTxt = this.batchData.controls.batchName.value+' is not added successfully. please try again later';  
          console.log('data is not saved successfully.....................');
        }
      });
    console.log(this.batchData.value);
  }

  get getBatchData(){
    return this.batchData.controls;
  }
}


