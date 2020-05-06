import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-pasword',
  templateUrl: './forgot-pasword.component.html',
  styleUrls: ['./forgot-pasword.component.scss']
})
export class ForgotPaswordComponent implements OnInit {

  constructor() { }
  Username:string;
  Password:string;
  ngOnInit(): void {
  }

  changePassword(){
    
  }

}
