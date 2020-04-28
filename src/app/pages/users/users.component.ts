import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private url: string = environment.Server+'imagen/';
  Usuarios = [];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private server:ServerService
  ) {
    this.Usuarios.push(
      {
        Usuario:'juean',
        img:'https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg',
        nombre:'juan',
        apellido:'perez',
        id:3      
      });
    this.server.getUsuarios().subscribe((data) => {
      this.Usuarios = [];
      for(let i = 0; i <= Object.keys(data).length; i++){

        this.Usuarios.push({
          Usuario: data['Usuario'][i].Usuario,
          img: this.url+data['Usuario'][i].Img,
          nombre: data['Usuario'][i].Nombre,
          apellido: data['Usuario'][i].Apellido,
          id: data['Usuario'][i].IdUsuario,
          Email: data['Usuario'][i].Email
        });
      }
    });

  }

  
  

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  Agregar(from, align){
    let status = false;
    this.Notificacion(from,align,status)
    this.modalService.dismissAll();
  }

  Notificacion(from, align,status){
    this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Welcome to <b>Black Dashboard Angular</b> - a beautiful freebie for every web developer.', '', {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-info alert-with-icon",
      positionClass: 'toast-' + from + '-' +  align
    });    
  }

  Delet(idUser){
    alert('Delet ' + idUser)
  }

  Edits(idUser){
    alert('edits ' + idUser)

  }
  ngOnInit(): void {
  }

}
