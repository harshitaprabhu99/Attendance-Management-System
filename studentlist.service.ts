import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Injectable({
  providedIn: 'root'
})
export class StudentlistService {
  // student_list = [{usn: "01", name: "sahana", isPresent : true},
  // {usn: "02", name: "abdul affou", isPresent : true},
  // {usn: "03", name: "harshita", isPresent : true},
  // { usn:"04",name:"Yajna", isPresent : true},
  // {usn:"05",name:"kushal", isPresent : true},
  // {usn: "06", name: "sahana", isPresent : true},
  // {usn: "07", name: "abdul affou", isPresent : true},
  // {usn: "08", name: "harshita", isPresent : true},
  // { usn:"09",name:"Yajna", isPresent : true},
  // {usn:"10",name:"kushal", isPresent : true}];
  constructor( private httpclient : HttpClient) { }
  getDetails(accessToken, classId) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':accessToken
      })
    };
    const headers = new HttpHeaders({'Authorization':accessToken});
    return this.httpclient.post("http://juegostudio.in:3021/student/list",{"classSubjectID" : classId},httpOptions)
  }


  

  // getStudentList(){
  //   return this.student_list;
  // }
  // updateStudentList(usn: number){
  //   this.student_list[usn].isPresent=!this.student_list[usn].isPresent;
  //   // console.log(this.student_list[usn].name, this.student_list[usn].isPresent)
  // }

  
  // getAbsentess(): Array<string>{
  //   let absentees: string[];
  //   for(let student of this.student_list){
  //     if(student.isPresent == false){
  //       absentees.push(student.usn)
  //     }
  //   }
  //   return absentees;
  // }
}
