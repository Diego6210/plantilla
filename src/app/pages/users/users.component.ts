import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  openLg(content) {
    this.modalService.open(content, { size: 'lg' ,  windowClass: 'dark-modal' });
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

  ngOnInit(): void {
  }

}
