import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { LoginService } from './../service1/login.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {
  imageUrl : string = "/assets/profile-image/profileImage.jpg";
  public name : string;

  accessToken : String = this._lService.getAccessToken();
  
  constructor(private _pService : ProfileService, private _lService: LoginService) { }

  ngOnInit() {
  }
  profileInfo(): void {
    // this._pService.getProfileDetails(this.accessToken )
    // .subscribe((data : any) =>  {
    //   this.FullName = data.data.fullName;
    //   this.Email = data.data.email;
    //   this.Phone = data.data.phone;
    //   this.Gender = data.data.gender;
    //   this.City = data.data.city;
    //   console.log(this.FullName,this.Email,this.Phone);
    // });
  console.log("works")
  }
  onClick(){
    localStorage.clear();
  }
}
