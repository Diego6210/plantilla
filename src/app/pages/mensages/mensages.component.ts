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
  }

  private url: string = environment.Server;

  Username:string;
  UsernameSend:string = null;
  UserimgSend:string;
  UserSend = [
    {
      user:'Jasen',
      img:'https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg'
    }
  ];

  Mensajes = [
    {
      usuario:'nose',
      message:'mensaje de nose',
      fecha:'12 dic'
    },{
      usuario:'jose',
      message:'mensaje de jose',
      fecha:'12 dic'
    }
  ];

  Usuarios =[];

  Chats = [
    {
      idUsuario:1,
      usuario:'nose',
      img:'https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg',
      fecha:'12 dic'
    },{
      idUsuario:2,
      usuario:'jose',
      img:'https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg',
      fecha:'15 dic'
    }
  ];

  ngOnInit(): void {
    this.getUsuarios();
  }


  SendMenssege(){
    alert('enviar mensaje');
  }

  selectUser(Userselect,UserselectImg){
    this.UsernameSend = Userselect;
    this.UserimgSend= UserselectImg;
  }
  
  openModal(content){
    this.modalService.open(content);
  }

  CrearChat(IdUsuario){
    this.modalService.dismissAll();
    alert(IdUsuario);

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
}
