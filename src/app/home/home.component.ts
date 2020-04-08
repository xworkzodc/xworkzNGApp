import { BatchService } from './../service/batch.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private batchService: BatchService) { }
  upcomingBatchHeading='';
  upcomingBatches:any=[];
  ngOnInit() {
    this.getUpcomingBatches();
  }

  getUpcomingBatches(){
    this.batchService.getUpcomingBatches().subscribe(data=>{
      console.log(data);
      if(data!=null)
      this.upcomingBatchHeading = "upcoming batches"
      this.upcomingBatches= data;
    });
  }


}