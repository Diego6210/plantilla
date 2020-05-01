import { Component, OnInit } from "@angular/core";
import { ServerSocketService } from './service/server-socket.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './service/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
  title = "black-dashboard-angular";

  constructor(
    private serverSocket: ServerSocketService,
    private router: Router,
    private storage: LocalStorageService,
    private toastr: ToastrService
  ){

  }

  ngOnInit(){

    /*this.serverSocket.listen('test').subscribe((data) => {
      console.log(data);
    });*/

    this.serverSocket.listen('connect').subscribe((data) => {
      console.log('Se conecto al servidor');
      
      if(this.storage.getStorage('clear') != 'true'){
        var usuario = {
          IdUsuario: this.storage.getStorage('IdUsuario'),
          Usuario:this.storage.getStorage('User') 
        };
        this.serverSocket.emit('ConectarServer',usuario)
        this.router.navigateByUrl('dashboard');

      }   
    });

    if(this.storage.getStorage('clear') == 'true')     
      this.router.navigateByUrl('login');

    /*if(this.storage.getStorage('clear') != 'true'){      
      var usuario = {
        IdUsuario: this.storage.getStorage('IdUsuario'),
        Usuario:this.storage.getStorage('User') 
      };
      this.serverSocket.emit('ConectarServer',usuario)
      this.router.navigateByUrl('dashboard');
    }
    else
      this.router.navigateByUrl('login');
*/
    this.serverSocket.listen('disconnect').subscribe((data) => {
      console.log('Se Desconecto del servidor');  
      this.Notificacion('Se perdio la conexion al servidor'); 
    });

    this.serverSocket.listen('broadcast').subscribe((data) => {
      this.Notificacion(data);     
    });

    this.serverSocket.listen('mensajePrivado').subscribe((data) => {  
      this.Notificacion(`Nuevo mensaje de ${data['Usuario']} : ${data['Mensaje']}`); 
    });

  }


  Notificacion(info){
    this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' + info, '', {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-info alert-with-icon",
      positionClass: 'toast-top-center'
    });    
  }
}
