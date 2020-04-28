import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.scss']
})
export class AssignTasksComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  Tarea:string;
  Titulo:string;
  Fecha:string;
  Usuario:string;


  ngOnInit(): void {
  }


  SaveTask(){
    alert(this.Titulo + '-' + this.Fecha);
  }

}
