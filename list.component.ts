import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { StudentlistService } from './../studentlist.service';
import { LoginService } from './../service1/login.service';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  accessToken : String = localStorage.getItem('access_token');
  classId : string = "5e329ed395efa80dd8b81c01";
  
  public absentees = [];

  constructor(public dialog: MatDialog, private myservice: StudentlistService) {
    
   }
// {usn:"05",name:"kushal", isPresent : true},
// {usn:"05",name:"kushal", isPresent : true},
// {usn:"05",name:"kushal", isPresent : true},
// {usn:"05",name:"kushal", isPresent : true}];
public student_list;
ngOnInit() {
  console.log(this.classId)
  //this.student_list=this.myservice.getStudentList();
   
  this.myservice.getDetails(this.accessToken, this.classId)
  .subscribe((data : any)=> {
    this.student_list = data.data,
  this.addStatus();

  console.log(this.student_list)});
}

addStatus(){
  this.student_list.forEach(function (element) {
    element.isPresent = "true";
  });
}
updateStudentList(usn: number){
  this.student_list[usn].isPresent=!this.student_list[usn].isPresent;
  // console.log(this.student_list[usn].name, this.student_list[usn].isPresent)
   
}
 
// getAbsentess(): Array<string>{
//     let absentees: string[];
//     for(let student of this.student_list){
//       if(student.isPresent == false){
//         absentees.push(student.usn)
//       }
//     }
//     return absentees;
//   }



 setColor(index) {
 
  this.updateStudentList(index);
  //     status = e.target.classList.contains('active');

  // e.target.classList.add(status ? 'inactive' : 'active');
  // e.target.classList.remove(status ? 'active' : 'inactive'); 
  

}

confirmation() : void{
  console.log("confirmation works")
}



confirmList(): void {
  for(let student of this.student_list){
    if(student.isPresent == false){
       this.absentees.push(student.studentID);
    }
  }
  // console.log(this.absentees)
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    panelClass: 'custom-modelBox',
    width: "390px",
    data : this.absentees
   

  });
  dialogRef.afterClosed().subscribe(results => {
    console.log('The dialog was closed');
    console.log(results);
    
  });
  
}
}



