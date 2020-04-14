import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  constructor(    
    private storage: LocalStorageService
  ) {
   
  }

  imgdefault='assets/img/default-avatar.png';
  cheange = false;
  Username:string;

  ngOnInit() {
    this.Username = this.storage.getStorage('User');
  }

  onChange($event){
    console.log($event.srcElement.value);
    console.log($event);
    //this.imgdefault=$event.srcElement.value;

    if ($event.target.files) {
      var reader = new FileReader();

      reader.onload = ($event:any) => {
        this.imgdefault = $event.target.result;
      }
      this.cheange = true;
      reader.readAsDataURL($event.target.files[0]);
    }
  }
}
