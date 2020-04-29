import { Component, OnInit } from '@angular/core';
import { ServerSocketService } from 'src/app/service/server-socket.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  constructor(    
    private serverSocket: ServerSocketService
  ) { }

  notificacion:string = "";
  alert:string = "";


  ngOnInit(): void {
  }

  emitMessage(){
    
    if(this.notificacion != '' || this.alert != ""){
      let data = {
        mensaje: this.notificacion,
        alert: this.alert
      }
      this.serverSocket.emit('broadcast',data);
      this.alert = "";
      this.notificacion = "";

      Swal.fire({
        icon: 'success',
        text:'Mensajes enviado a todos los usuarios conectados'
      });

    }else{
      Swal.fire({
        icon: 'error',
        text:'Complete los campos',
      });
    }
  }

}
