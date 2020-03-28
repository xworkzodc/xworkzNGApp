warning: LF will be replaced by CRLF in src/app/view-batch/view-batch.component.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in src/app/view-batch/view-batch.component.ts.
The file will have its original line endings in your working directory
[1mdiff --git a/src/app/course-details/course-details.component.html b/src/app/course-details/course-details.component.html[m
[1mindex 0b9105a..c3a5d31 100644[m
[1m--- a/src/app/course-details/course-details.component.html[m
[1m+++ b/src/app/course-details/course-details.component.html[m
[36m@@ -123,7 +123,7 @@[m
           <h4 class="modal-title">Update Batch</h4>[m
           <button type="button" class="close" data-dismiss="modal">&times;</button>[m
         </div>[m
[31m-  [m
[32m+[m[41m   [m
         <!-- Modal body -->[m
         <div class="modal-body">[m
             <div class="row justify-content-center">[m
[1mdiff --git a/src/app/home/home.component.ts b/src/app/home/home.component.ts[m
[1mindex e66d7a8..a7aace7 100644[m
[1m--- a/src/app/home/home.component.ts[m
[1m+++ b/src/app/home/home.component.ts[m
[36m@@ -1,5 +1,4 @@[m
 import { BatchService } from './../service/batch.service';[m
[31m-import { Card } from './card.blueprint';[m
 import { Component, OnInit } from '@angular/core';[m
 @Component({[m
   selector: 'app-home',[m
[1mdiff --git a/src/app/view-batch/view-batch.component.html b/src/app/view-batch/view-batch.component.html[m
[1mindex 02a0f3d..fd1fc98 100644[m
[1m--- a/src/app/view-batch/view-batch.component.html[m
[1m+++ b/src/app/view-batch/view-batch.component.html[m
[36m@@ -63,11 +63,8 @@[m
             </ng-template>[m
         </ngx-datatable-column>[m
 [m
[31m-        <ngx-datatable-column name="status" prop="isActive" [width]="80">[m
[31m-            <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">[m
[31m-                <button type="button" class="btn btn-info" (click)="changeBatchStatus(row)" *ngIf='row.isActive'>Actived</button>[m
[31m-                <button type="button" class="btn btn-danger" (click)="changeBatchStatus(row)" *ngIf='!row.isActive'>Deactived</button>[m
[31m-            </ng-template>[m
[32m+[m[32m        <ngx-datatable-column name="status" prop="batchStatus" [width]="80">[m
[32m+[m[32m            {{batchStatus}}[m
         </ngx-datatable-column>[m
 [m
         <ngx-datatable-column name="action"  [width]="80">[m
[36m@@ -143,6 +140,16 @@[m
                         ></ngx-select-dropdown>[m
                     </div>[m
     [m
[32m+[m
[32m+[m[32m                    <div class="form-group">[m
[32m+[m[32m                        <label for="courseName">Select Batch Status:</label>[m
[32m+[m[32m                        <ngx-select-dropdown[m[41m [m
[32m+[m[32m                        (change)="selectionBatchChanged($event)"[m[41m [m
[32m+[m[32m                        [config]="config1"[m[41m [m
[32m+[m[32m                        [options]="dropdownOptions1"[m
[32m+[m[32m                        formControlName="batchStatus"[m
[32m+[m[32m                        ></ngx-select-dropdown>[m
[32m+[m[32m                    </div>[m
                     <!-- <div class="form-control">[m
                         <label for=""></label>[m
                     </div> -->[m
[1mdiff --git a/src/app/view-batch/view-batch.component.ts b/src/app/view-batch/view-batch.component.ts[m
[1mindex 4b605e3..67d0223 100644[m
[1m--- a/src/app/view-batch/view-batch.component.ts[m
[1m+++ b/src/app/view-batch/view-batch.component.ts[m
[36m@@ -13,12 +13,14 @@[m [mexport class ViewBatchComponent implements OnInit {[m
   constructor(private batchService: BatchService, private formBuilder: FormBuilder, private courseService: CourseService) { }[m
   rows: any = [];[m
   dropdownOptions:any=[];[m
[32m+[m[32m  dropdownOptions1:any=[];[m
   batchData = new FormGroup({[m
     batchId: new FormControl('',[Validators.required]),[m
     batchName:new FormControl('',[Validators.required]),[m
     batchType : new FormControl('',[Validators.required]),[m
     batchTime : new FormControl('' , [Validators.required]),[m
[31m-    courseName : new FormControl ('', [Validators.required])[m
[32m+[m[32m    courseName : new FormControl ('', [Validators.required]),[m
[32m+[m[32m    batchStatus: new FormControl('',[Validators.required])[m
   });[m
   courseText='';[m
   config = {[m
[36m@@ -35,10 +37,28 @@[m [mexport class ViewBatchComponent implements OnInit {[m
     [m
   }[m
 [m
[32m+[m[32m  config1 = {[m
[32m+[m[32m    // displayKey:"bName", //if objects array passed which key to be displayed defaults to description[m
[32m+[m[32m    search:true ,//true/false for the search functionlity defaults to false,[m
[32m+[m[32m    height: 'auto' ,//height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear[m
[32m+[m[32m    placeholder:'Select', // text to be displayed when no item is selected defaults to Select,[m
[32m+[m[32m    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,[m
[32m+[m[32m    limitTo: this.dropdownOptions.length, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe[m
[32m+[m[32m    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more[m
[32m+[m[32m    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching[m
[32m+[m[32m    searchPlaceholder:'Search' ,// label thats displayed in search input,[m
[32m+[m[32m    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys[m
[32m+[m[41m    [m
[32m+[m[32m  }[m
[32m+[m
   selectionChanged(event){[m
     this.batchData.controls['courseName'].setValue(event.value);[m
   }[m
 [m
[32m+[m[32m  selectionBatchChanged(event){[m
[32m+[m[32m    this.batchData.controls['batchStatus'].setValue(event.value);[m
[32m+[m[32m  }[m
[32m+[m
   ngOnInit() {[m
     this.getAllBatchData();[m
   }[m
