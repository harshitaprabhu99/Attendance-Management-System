import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  alertService: any;
  success: boolean;
  access_token: string;
  constructor(private httpclient : HttpClient, private router: Router) { }

  // getLoginDetails(name , pass) : Promise<any>{
  //   return this.httpclient.post("http://juegostudio.in:3021/user/login", {name , pass})
  //   .toPromise();
  // }
  getAccessToken(){
    return this.access_token;
  }

  verifyLogin(name: string, pass: string) {
   return this.httpclient.post("http://juegostudio.in:3021/user/login", {"email":name , "password":pass})
  }

  
}
