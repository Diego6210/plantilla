import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ServerService } from 'src/app/service/server.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private server:ServerService
  ) { }

  Username:string;
  Password:string;
  
  private url: string = environment.Server;

  ngOnInit(): void {
  }

  Login(){
    console.log(this.Username);
    this.server.Login(this.Username).subscribe((data)=>{
      console.log(data);
    });
    this.storage.setStorage('User', this.Username);
    this.storage.setStorage('Img', this.url+'imagen/'+this.Username + '.jpg');
    this.router.navigateByUrl('dashboard');
  }

  ForgotPasword(){
    this.router.navigateByUrl('ForgotPasword');
  }


}
