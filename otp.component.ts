import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewPasswordService } from '../service1/new-password.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otp_conflict = false;
  password: string;
  otp: string;
  constructor(private router: Router, private getpassword: NewPasswordService) { }

  ngOnInit() {
  }
  onClick(){
    this.getpassword.getNewPassword(this.otp,this.password)
    .pipe(
      catchError((error: HttpErrorResponse)=> this.handleError(error))
    )
    .subscribe(
      (data:any) =>{
        if(data.code == 200){
          this.router.navigate(['/newpassword']);
        }
      }
    )
  }

  handleError(error: HttpErrorResponse){
    if(error.status == 400){
      this.otp_conflict = true;
    }
    else return Observable.throw(error);
  }

}
