import { TrainerService } from './../service/trainer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-trainer',
  templateUrl: './view-trainer.component.html',
  styleUrls: ['./view-trainer.component.css']
})
export class ViewTrainerComponent implements OnInit {
  updateTrainerModelData  ='';
  btchDt='';
  updateData='';
  columns = [ { prop: 'trainerId' , name: 'No' }, { name: 'trainerName' }, { name: 'Email' },{name:'view'},{name:'Action' , prop:'action'}];
  rows: any = [];
  batchName: any;
  constructor(private trainerService :TrainerService , private route:Router) { }
  isTrainterData = true;
  isBatchDt = false;
  empId=0;
  dropdownOptions:any =[];
  trainerName='';
  emailId='';
  trId=0;
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
    if(this.isTrainterData)
      this.getAllTrainers();
  
    }


  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(data => {
      console.log(data);
      this.isBatchDt= false;
      this.rows = data;
    });  
  }


  getBatchesByTrainerId(id){
    // console.log("id is "+id);
    this.empId=id;
    this.trainerService.getBatchDetailsByTrainerId(id).subscribe(data =>{
      // console.log(data);
      this.isTrainterData = false;
      this.isBatchDt= false;
      this.rows = data;
    });
  }

  viewBatchDetailsByBatchId(data){
    // this.trainerService.getBatchDetailsByTrainerId();
    console.log(data);
    this.btchDt=data.batchName+ ' Batch Details'
    this.isBatchDt= true;
    this.isTrainterData = false;
    this.trainerService.getStudentsByBatchId(data.batchId).subscribe(data=>{
      console.log(data);
      this.rows = data;
    }); 
  }

  addBatch(){
    console.log(this.empId); 
    this.trainerService.getAllNewBatchByTrainerId(this.empId).subscribe(data=>{
      this.dropdownOptions = data;
    });
  }

  getStudentDetails(empId){
    console.log(empId );
    this.route.navigate(['/studentData'],{queryParams:{'stId':empId}});
  }

  addBatchToTrainer(){
    // console.log();
    if(this.empId!=0 && (this.batchName!=null && this.batchName.length>0)){
      var crfm=confirm('are you sure you want to add this batch?');
      if(crfm==true){
        this.trainerService.addBatchToTrainer(this.empId,this.batchName).subscribe(data=>{
          // console.log(data)
            if(data.status==201){
              this.getBatchesByTrainerId(this.empId);
              document.getElementById('addBatchClose').click();
          }

        });
      }
    }
  }

  selectionChanged(event){
    this.batchName = event.value;
  }

  editTrainerDetails(trainer){
    this.trId = trainer.trainerId;
    this.trainerName = trainer.trainerName;
    this.emailId = trainer.email;
  }

  updateTrainerData(){
    if(this.trId!=null && this.trainerName!=null && this.emailId!=null){
      if(this.trId!=0 && this.trainerName.length>0 && this.emailId.length>0){
        console.log('data is not not empty.......');
        this.trainerService.updateTrainerData(this.trId, this.trainerName, this.emailId).subscribe(data=>{
          console.log('data is ');
          console.log(data);
          if(data.status==200){
            
            this.getAllTrainers();
            this.updateData= this.trainerName+' data updated successfully.....';
            document.getElementById('closeTrainerUpdateModal').click();
          }
          else{
            this.updateTrainerModelData='Something went wrong. please try again.....';  
          }
        });
      }
      else
        alert('data can not be empty');
      }
  }
}
