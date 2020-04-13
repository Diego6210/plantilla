import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  constructor() {
   
  }

  imgdefault='assets/img/default-avatar.png';
  
  ngOnInit() {}

  onChange($event){
    console.log($event.srcElement.value);
    console.log($event);
    //this.imgdefault=$event.srcElement.value;

    if ($event.target.files) {
      var reader = new FileReader();

      reader.onload = ($event:any) => {
        this.imgdefault = $event.target.result;
      }

      reader.readAsDataURL($event.target.files[0]);
    }
  }
}
