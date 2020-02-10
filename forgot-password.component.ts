import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { group } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NewPasswordService } from '../service1/new-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email_id: string;
  // forgot_form: FormGroup;
  submitted = false;
  email_conflict = false;
  // invalid_otp = false;
  // email_sent = false;
  // otp:string;
  constructor(
    
    private router: Router,
    // private http: HttpClient,
    private getpassword: NewPasswordService
  ) { }

  ngOnInit() {

  }
  // get f(){ return this.forgot_form.controls;}
  onClick(){
    console.log(this.email_id);

    this.getpassword.getOTP(this.email_id)
    .pipe(
      catchError((error: HttpErrorResponse)=> this.handleError(error))
    )
    .subscribe(
      (data: any) =>{
        if(data.code == 200){
          this.router.navigate(['/otp']);
        }
      }
    )
    

    

  }

  

  handleError(error: HttpErrorResponse){
    if(error.status == 409){
      this.email_conflict = true;
    }
    else{
      return Observable.throw(error);
    }
  }
}
