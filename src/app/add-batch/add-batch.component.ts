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
  batchData = new FormGroup({
    batchName:new FormControl('',[Validators.required]),
    batchType : new FormControl('',[Validators.required]),
    batchTime : new FormControl('' , [Validators.required]),
    courseName : new FormControl ('', [Validators.required]),
    totalBatches: new FormControl ('',[Validators.required])
  });
  courseText='';
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

  selectionChanged(event){
    this.batchData.controls['courseName'].setValue(event.value);
  }

  ngOnInit() {
    this.getAllCourseNames();
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
        if(data.status==201){
          // console.log(data);
          this.addBatchTxt = this.batchData.controls.batchName.value+' is added successfully..............';  
         document.getElementById('formReset').click();
        }else{
          this.addBatchTxt = this.batchData.controls.batchName.value+' is not added successfully. please try again later';  
          console.log('data is not saved successfully.....................');
        }
      });
  }
}


