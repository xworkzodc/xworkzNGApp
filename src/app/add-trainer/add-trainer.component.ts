import { Router } from '@angular/router';
import { TrainerService } from './../service/trainer.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private trainerService:TrainerService , private route : Router) { }
  formData:any;
  trainerData = this.formBuilder.group({
    trainerName: new FormControl('',[Validators.required]),
    emailId: new FormControl('',[Validators.required])
  });
  ngOnInit() {
    console.log(this.trainerData);
    this.formData=this.trainerData.controls;
  }

  addTrainer(){
    console.log(this.trainerData);
    // if(this.trainerData.value.)
    console.log(this.trainerData.value.emailId);
    if(this.trainerData.value.emailId.length>0  && this.trainerData.value.trainerName.length>0){
      this.trainerService.addTrainerDetails(this.trainerData.value).subscribe(data=>{
        // console.log(data.status);
        if(data.status==201){
          this.route.navigate(['/viewTrainer']);
        }else if(data.status != 201){
          alert('data is not getting saved............');
        }
      });
    }
  }
}
