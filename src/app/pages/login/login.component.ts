import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ServerService } from 'src/app/service/server.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

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
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text:'Espere por favor...'
    });Swal.showLoading();

    this.server.getUsuariobyUsuario(this.Username).subscribe((data)=>{

      Swal.close();

      if(data['Usuario'].length == 0){
        Swal.fire({
          icon: 'error',
          text:'Usuario Incorrecto',
        });
      }else if(data['Usuario'][0].Password != this.Password){
        Swal.fire({
          icon: 'error',
          text:'Password Incorrecto'
        });
      } else
      {
        this.router.navigateByUrl('dashboard');
        this.storage.setStorage('User', this.Username);
        this.storage.setStorage('Img', this.url+'imagen/' + data['Usuario'][0].Img);  
        this.storage.setStorage('IdUsuario', data['Usuario'][0].IdUsuario);  
        this.storage.setStorage('TipoUsuario', data['Usuario'][0].IdTipoUsuario);  
        this.storage.setStorage('Email', data['Usuario'][0].Email);  
      }    
    });
  }

  ForgotPasword(){
    this.router.navigateByUrl('ForgotPasword');
  }


}
