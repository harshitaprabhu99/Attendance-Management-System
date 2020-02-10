import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.css'],
})
export class UploadProfileComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UploadProfileComponent>,   
    @Inject(MAT_DIALOG_DATA) public fileUpload : File = null) { }

  ngOnInit() {
  }

  handelFileInput(file : FileList){
    this.fileUpload = file.item(0);
  }

  onClick(){
    this.dialogRef.close(this.fileUpload);
  }
  
  Close_dialog(): void{
    this.dialogRef.close();
  }

}
