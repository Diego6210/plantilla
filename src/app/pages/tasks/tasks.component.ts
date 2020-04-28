import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  Tarea:string;
  Titulo:string;
  Fecha:string;

  Tasks = [
    {
      IdTarea:1,
      Titulo:'tarea 1',
      Tarea:'nose que mas',
      Fecha:'27/04/2019',
      Completado:true
    },
    {
      IdTarea:2,
      Titulo:'tarea 2',
      Tarea:'nose',
      Fecha:'27/04/2019',
      Completado:false
    }
  ];

  ngOnInit(): void {
  }

  ChangeTalks(task,estatus){
    alert('change '+task);
  }

  EditsTalks(task){
    alert('edits '+task);
  }

  openTaskModal(content){
    this.modalService.open(content);
  }

  SaveTask(){
    this.modalService.dismissAll();
    alert(this.Titulo + '-' + this.Fecha);
  }
}
