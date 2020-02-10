import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ClasslistserviceService} from './../classlistservice.service';
import { Observable, observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {  HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css']
})
export class ClasslistComponent implements OnInit {

  accessToken : String = localStorage.getItem('access_token');
  date = new Date();
         
//   classes =[
//     { 
//       time:"10:00 AM",
//      roomNumber:"201",
//       className:"LH101",
//    classSubjectID:"534NCD",
// subjectName:"english"
//     },
//     {
//       time:"10:00 AM",
//      roomNumber:"201",
//       className:"LH101",
//    classSubjectID:"534NCD",
// subjectName:"english"
//     },
//     {
//       time:"10:00 AM",
//      roomNumber:"201",
//       className:"LH101",
//    classSubjectID:"534NCD",
// subjectName:"english"
//   },
//   {
//     time:"10:00 AM",
//     roomNumber:"201",
//      className:"LH101",
//   classSubjectID:"534NCD",
// subjectName:"english"
//   },
//   {
//     time:"10:00 AM",
//      roomNumber:"201",
//       className:"LH101",
//    classSubjectID:"534NCD",
// subjectName:"english"
//   }
//   ]

  
  constructor(private router : Router,private lservice:ClasslistserviceService) { }
 
  // public classSubjectId: [];
  //  public className:[]; 
  //  public roomNumber:[];
  //  public subjectName: [];
  //  public time:[];
  //  public attendanceTaken:[];

  public classes :[];


  ngOnInit() {

    // this.class_list=this.lservice.getList();
     
    this.serviceApiCall();
  }

  serviceApiCall(){
    this.lservice.getClasslist(this.accessToken,this.date).pipe(
      catchError((error: HttpErrorResponse) =>this.handleError(error))
    )
    .subscribe((data : any)=> {
      console.log(data);
      // this.classSubjectId = data.data.classSubjectId;
      //         this.className = data.data.className;
      //         this.roomNumber = data.data.roomNumber;
      //         this.subjectName = data.data.subjectName;
      //         this.time= data.data.time;
      //         this.attendanceTaken=data.data.attendanceTaken;
       if(data.code == 404)
      this.classes = [];
      // else
      this.classes=data.data
      
      console.log(this.classes)
  });
  }

  onClick(classDetail){
    let classId, attendanceId;
    // if(classDetail.classSubjectID)
     classId = classDetail.classSubjectId;
    //  if(classDetail.attendanceLogId)
     attendanceId = classDetail.attendanceLogId;
     console.log(classId);
     console.log(attendanceId)
    this.router.navigate(['/studentlist']);
  }

  onDateSelected(val){
    this.date = val;
    this.serviceApiCall();
  }


  handleError(error: HttpErrorResponse){
    if(error.status == 404){
      this.classes = [];
    }else{
      return Observable.throw(error);
    }
  }

}
