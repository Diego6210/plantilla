import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor() { }

  Tasks = [
    {
      IdTarea:1,
      Titulo:'tarea 1',
      Tarea:'nose que mas',
      Completado:true
    },
    {
      IdTarea:2,
      Titulo:'tarea 2',
      Tarea:'nose',
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

}
