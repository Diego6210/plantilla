import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  constructor(    
    private storage: LocalStorageService,
    private server:ServerService
  ) {
  
  }

  imgdefault = this.storage.getStorage('Img')
  cheange = false;
  Username:string;
  routerServer = 'http://localhost:3000/upload/'+ this.Username;
  formData = new FormData();

  ngOnInit() {
    this.Username = this.storage.getStorage('User');
  }

  onChange($event,Archivo: FileList){
    console.log($event);

    if ($event.target.files) {
      var reader = new FileReader();

      reader.onload = ($event:any) => {
        this.imgdefault = $event.target.result;
      }
      this.cheange = true;
      reader.readAsDataURL($event.target.files[0]);
      

      this.formData.delete('archivo');
      this.formData.append('archivo', Archivo[0]);

    }
  }
  
  onSubmit() {
    this.server.uploadFile(this.formData,this.Username).subscribe((data) =>{ console.log(data)});    
  }  
}