import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, observable, throwError } from 'rxjs';

import { LoginService } from '../service1/login.service';
import { catchError, map } from 'rxjs/operators';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email = "";
  public password = "";
  alertService: any;
  access_token: any;
  constructor(private router: Router , private _loginService : LoginService, private http: HttpClient) { }

  ngOnInit() {

  }
  public body;
  
  success: boolean;
  
  onClickSubmit(){
    this._loginService.verifyLogin(this.email,this.password)
    .pipe(
      catchError((error: HttpErrorResponse) =>this.handleError(error))
    )
    
    .subscribe(
      (data: any) => 
      {
        if(data.code == 200){
        this.success = true;
        this.router.navigate(['/classlist'])
        localStorage.setItem('access_token',data.data.userToken)
        console.log(localStorage.getItem('access_token'))
        }
      },
      (error: any) => console.log('http error',error)
    
    );
  }
    
    
    // this.body = {"emai": this.email,
    //         "password": this.password}
    // this.http.post(this.url,this.body,{responseType:'text'}).toPromise().then(data => console.log(data));
    // console.log(this.email);
    // console.log(this.password);
    

    // this._loginService.getLoginDetails(this.email,this.password)
    
    // if(this.success){
    //   this.router.navigate(['/classlist'])
    // }
    // else{
    //   this.router.navigate(['/login'])
    // }


  
  onSignup(){
    this.router.navigate(['/register']);
  }

  handleError(error: HttpErrorResponse){
    if(error.status == 401){
      this.success=false;
    }else{
      return Observable.throw(error);
    }
  }
  
}
