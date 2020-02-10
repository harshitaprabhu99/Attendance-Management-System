import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class ClasslistserviceService {
 public class_list=[ { 
        classSubjectId :"10:00 AM",
      className:"201",
        roomNumber:"LH101",
     subjectName:"534NCD",
 time:"english"
      }];

  constructor(private httpclient : HttpClient) { }
  getClasslist(accessToken,date) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':   accessToken
      })
    };
    const headers = new HttpHeaders({'Authorization':accessToken});
    return this.httpclient.post("http://juegostudio.in:3021/user/timeTable",{"date":date}, httpOptions)
  }
  getList(){
    return this.class_list;
  }


  // getClasslist(classlist){
  //   return this.httpclient.post('http://juegostudio.in:3021/user/signup',classlist)
  // }
}
