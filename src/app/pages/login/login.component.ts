import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private storage: LocalStorageService
  ) { }

  Username:string;
  Password:string;

  ngOnInit(): void {
  }

  Login(){
    console.log(this.Username);
    this.storage.setStorage('User', this.Username);
    this.router.navigateByUrl('dashboard');
  }

  ForgotPasword(){
    this.router.navigateByUrl('ForgotPasword');
  }


}
