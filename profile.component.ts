import { LoginService } from './../service1/login.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup,Validators, FormControl } from '@angular/forms';
import { UploadProfileComponent } from '../upload-profile/upload-profile.component';
import { ProfileService } from '../service/profile.service';
// import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  
  imageUrl : string = "/assets/profile-image/profileImage.jpg"; 
  DialogService: any;

  accessToken : String = localStorage.getItem('access_token');


  
  public FullName:string;
  public Email:string;
  public Phone:string;
  public Gender:string;
  public City:string;

  profileForm: FormGroup;
  submitted = false;
  


  userDetails(event){
    //  event.preventDefault()
    //  const target = event.target
    //  const name = target.querySelector('#userName').value
    //  const email = target.querySelector('#Email_id').value
    //  const phno = target.querySelector('#phone_no').value

    // console.log(name)
    // console.log(email)
    // console.log(phno)

    // this._profileService.getProfileDetails()
    // .then(data =>   console.log(data));
    alert("Profile updated!")
    this.submitted = true;
    // console.log(this.profileForm.value);
    console.log(this.profileForm.value)
    this._profileService.updateProfile(this.profileForm.value, this.accessToken)
    .subscribe((data : any) => console.log(data))

   // console.log(this.FullName)
  }
  
  constructor(
   
    public dialog: MatDialog, 
    private _profileService : ProfileService,
    private formBuilder : FormBuilder, 
    private _loginService : LoginService) { }


  ngOnInit(): void{
  
    this.profileForm = this.formBuilder.group({
      fullName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.pattern('[0-9]+')])],
      gender : ['',Validators.required],
      city : ['',Validators.required]
 
    });
    console.log(this.profileForm.value)
    // console.log(localStorage.getItem('access_token'))

    
    
    this._profileService.getProfileDetails(this.accessToken )
    .subscribe((data : any) =>  {
      this.FullName = data.data.fullName;
      this.Email = data.data.email;
      this.Phone = data.data.phone;
      this.Gender = data.data.gender;
      this.City = data.data.city;
      console.log(this.Gender);
    });
  }
  
  get fval(){
    return this.profileForm.controls;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(UploadProfileComponent, {
      panelClass: 'custom-modelBox',
      width: "390px"
    });

    dialogRef.afterClosed().subscribe(results => {
      console.log('The dialog was closed');
      console.log(results);

      //reading file value
      var reader = new FileReader();
         reader.onload = (event :any) => {
           this.imageUrl = event.target.result;
         }
         reader.readAsDataURL(results);
    });
  
  }
  }


 
  


