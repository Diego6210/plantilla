import { Component, OnInit } from "@angular/core";
import { ServerSocketService } from './service/server-socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
  title = "black-dashboard-angular";

  constructor(
    private serverSocket: ServerSocketService,
    private toastr: ToastrService
  ){

  }

  ngOnInit(){

    /*this.serverSocket.listen('test').subscribe((data) => {
      console.log(data);
    });*/

    this.serverSocket.listen('connect').subscribe((data) => {
      console.log('Se conecto al servidor');
      //this.Notificacion('Se conecto al servidor');     
    });

    this.serverSocket.listen('disconnect').subscribe((data) => {
      console.log('Se Desconecto del servidor');  
      this.Notificacion('Se perdio la conexion al servidor'); 
    });

    this.serverSocket.listen('broadcast').subscribe((data) => {
      this.Notificacion(data);     
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
