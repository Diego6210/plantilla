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
    this.server.getUsuariobyUsuario(this.Username).subscribe((data)=>{

      if(Object.keys(data).length == 0){
        alert('Usuario Incorrecto')
      }else if(data['Usuario'][0].Password != this.Password){
        alert('Password incorrecto');
      } else
      {
        this.router.navigateByUrl('dashboard');
        this.storage.setStorage('User', this.Username);
        this.storage.setStorage('Img', this.url+'imagen/' + data['Usuario'][0].Img);  
      }    
    });
  }

  ForgotPasword(){
    this.router.navigateByUrl('ForgotPasword');
  }


}
