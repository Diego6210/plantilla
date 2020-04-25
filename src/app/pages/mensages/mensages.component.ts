import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mensages',
  templateUrl: './mensages.component.html',
  styleUrls: ['./mensages.component.scss']
})
export class MensagesComponent implements OnInit {

  constructor(
    private storage: LocalStorageService,
    private modalService: NgbModal
  ) {
    this.Username = this.storage.getStorage('User');
  }


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

  Chats = [
    {
      usuario:'nose',
      img:'https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg',
      fecha:'12 dic'
    },{
      usuario:'jose',
      img:'https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg',
      fecha:'15 dic'
    }
  ];

  ngOnInit(): void {
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
}
