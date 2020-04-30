import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/service/server.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mensages',
  templateUrl: './mensages.component.html',
  styleUrls: ['./mensages.component.scss']
})
export class MensagesComponent implements OnInit {

  constructor(
    private storage: LocalStorageService,
    private modalService: NgbModal,
    private server:ServerService
  ) {
    this.Username = this.storage.getStorage('User');
    this.IdUsername = this.storage.getStorage('IdUsuario');
  }

  private url: string = environment.Server;
  Username:string;
  IdUsername:string
  UsernameSend:string = null;
  UserimgSend:string;
  Mensajes = [];
  Usuarios =[];
  Chats = [];
  Mensaje:string;
  IdChat:number;

  ngOnInit(): void {
    this.getChats();
    this.getUsuarios();
  }


  SendMenssege(){
    this.server.setChatMensaje(this.IdUsername,this.IdChat,this.Mensaje).subscribe((data) =>{ 
      this.Mensajes.push({
        usuario:this.IdUsername,
        message:this.Mensaje
      });
  
      this.Mensaje = '';
    });
  }

  selectUser(Userselect,UserselectImg,IdChat){
    this.UsernameSend = Userselect;
    this.UserimgSend= UserselectImg;
    this.IdChat = IdChat;

    this.server.getChatsMensajes(IdChat).subscribe((data) => {
      this.Mensajes = []
      console.log(data);
      for(let i = 0; i < data['Chats'].length; i++){

        this.Mensajes.push({
          usuario:data['Chats'][i].IdUsuario,
          message:data['Chats'][i].Mensaje,
          fecha:data['Chats'][i].Hora

        });
      }
    });

  }
  
  openModal(content){
    this.modalService.open(content);
  }

  CrearChat(IdUsuario){
    this.getChats();
    this.modalService.dismissAll();
    this.server.setChat(IdUsuario,this.IdUsername).subscribe((data) => {
      if(data['ok']){
        alert(data['mensaje']);
      }else if(data['Chats'].IdChats != 0)
        console.log(data['Chats']);
      else if(!data['ok']){
        alert(data['mensaje']);
      }
        //alert(data['mensaje'])

        //console.log(data['Chats']);
    });

  }

  getUsuarios(){
    this.server.getUsuariosAll().subscribe((data) => {
      
      for(let i = 0; i < data['Usuario'].length; i++){

        this.Usuarios.push({
          
          usuario:data['Usuario'][i].Usuario,
          img:this.url+'imagen/' + data['Usuario'][i].Img,
          idUsuario:data['Usuario'][i].IdUsuario

        });
      }
    });
  }

  getChats(){
    this.server.getChats(this.IdUsername).subscribe((data) => {
      this.Chats = [];
      for(let i = 0; i < data['Chats'].length; i++){
        
        if(data['Chats'][i].IdUsuario1 == this.IdUsername){
          var idUsuario = data['Chats'][i].IdUsuario2;
          var usuario = data['Chats'][i].Usuario2;
          var img = data['Chats'][i].Img2;
          var nombre = data['Chats'][i].Nombre2;
          var apellido = data['Chats'][i].Apellido2;
        }else{
          var idUsuario = data['Chats'][i].IdUsuario1;
          var usuario = data['Chats'][i].Usuario1;
          var img = data['Chats'][i].Img1;
          var nombre = data['Chats'][i].Nombre1;
          var apellido = data['Chats'][i].Apellido1;
        }

        this.Chats.push({
          
          IdChats:data['Chats'][i].IdChats,
          usuario:usuario,
          img:this.url+'imagen/' + img,
          idUsuario: idUsuario,
          nombre:nombre,
          apellido:apellido
        });
      }
    });
  }
}
