import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewPasswordService {
  email:string
  constructor(private http: HttpClient) { }

  getOTP(email: string){
    this.email = email;
    return this.http.post("http://juegostudio.in:3021/user/forgotPassword",{"email":this.email});
  }

  getNewPassword(otp: string, password: string){
    return this.http.post("http://juegostudio.in:3021/user/newPassword",{"email":this.email,"otp":otp, "password":password});
  }

}
