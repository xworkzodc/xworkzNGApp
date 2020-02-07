import { CourseService } from './../service/course.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BatchService } from './../service/batch.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-batch',
  templateUrl: './view-batch.component.html',
  styleUrls: ['./view-batch.component.css']
})
export class ViewBatchComponent implements OnInit {

  constructor(private batchService: BatchService, private formBuilder: FormBuilder, private courseService: CourseService) { }
  rows: any = [];
  dropdownOptions:any=[];
  batchData = new FormGroup({
    batchId: new FormControl('',[Validators.required]),
    batchName:new FormControl('',[Validators.required]),
    batchType : new FormControl('',[Validators.required]),
    batchTime : new FormControl('' , [Validators.required]),
    courseName : new FormControl ('', [Validators.required])
  });
  courseText='';
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
    this.getAllBatchData();
  }
  getAllBatchData(){
    this.batchService.getAllBatchesData().subscribe(data=>{
      this.rows= data;
    });
  }

  changeBatchStatus(data){
    console.log(data);
    this.batchService.updateBatchStatusById(data.batchId).subscribe(data =>{
      console.log(data);
      if(data.status == 200){
        this.getAllBatchData();
      }
    });
  }

  getAllCourseNames() {
    this.courseService.getAllCourseNames().subscribe(data=>{
      this.dropdownOptions = data;
    });
  }
  editBatchData(data){
    console.log(data);
    this.getAllCourseNames();
    console.log(this.batchData);
    this.batchData.controls['batchId'].setValue(data.batchId);
    this.batchData.controls['batchName'].setValue(data.batchName);
    this.batchData.controls['batchType'].setValue(data.batchType);
    this.batchData.controls['batchTime'].setValue(data.batchTime);
    this.batchData.controls['courseName'].setValue(data.courseName);

    // this.batchData.controls.batchName.value = 'hi';
  }
  updateBatchData(){
    console.log(this.batchData.value);
    this.batchService.upadateBatchDataService(this.batchData.value).subscribe(data=>{
      console.log(data);
      if(data.status==200){
        this.courseText = this.batchData.get('batchName').value +" is updated successfully";
        document.getElementById('updateCourseModal').click();
        
      }else{
        this.courseText='batch is not updated successfully. please try again later.'
      }

    });
  }

  
}
