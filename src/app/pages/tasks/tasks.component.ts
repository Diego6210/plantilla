import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(
    private storage: LocalStorageService,
    private modalService: NgbModal,
    private server:ServerService
  ) { }

  Tarea:string;
  Titulo:string;
  Fecha:string;
  idUsuario = this.storage.getStorage('IdUsuario');

  TituloModal:string = 'Nueva Tarea';
  TipoModal:boolean = true;
  idtask:number = 0;
  Tasks = [];

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.server.getTareasbyuser(this.idUsuario).subscribe((data) => {
      this.Tasks = [];
      for(let i = 0; i < data['Tasks'].length; i++){
        
        var check = true; //2
        if(data['Tasks'][i].Completado == 1)
          check = false; // 1


        this.Tasks.push({

          IdTarea: data['Tasks'][i].IdTarea,
          Titulo:data['Tasks'][i].Titulo,
          Tarea:data['Tasks'][i].Tarea,
          Fecha:data['Tasks'][i].Date,
          Completado: check

        });
      }
    });
  }

  ChangeTalks(task,$event){
    
    if($event.target.checked)
      this.server.setTareaChange(2,task,this.idUsuario).subscribe((data) => {console.log(data)});
    else
      this.server.setTareaChange(1,task,this.idUsuario).subscribe((data) => {console.log(data)});
  }

  EditsTalks(task,content){
    this.server.getTareasbyID(task).subscribe((data) => {
      this.Titulo  = data['Tasks'][0].Titulo;
      this.Tarea = data['Tasks'][0].Tarea;
      this.Fecha = data['Tasks'][0].Fecha;
    });

    this.idtask = task;
    this.TituloModal = 'Editar Tarea';
    this.TipoModal = false;
    this.modalService.open(content);
  }

  UpdateTask(task){
    if(this.Titulo  != undefined || this.Tarea != undefined || this.Fecha != undefined )
    { 
      if(this.Titulo  != undefined || this.Tarea != undefined || this.Fecha != undefined )
      { 
        this.modalService.dismissAll();
        this.server.setTareaUpdate(this.Titulo,this.Tarea,this.Fecha,this.idtask,this.idUsuario).subscribe((data) =>{ this.getTasks();console.log(data)});
        this.getTasks();
        this.Titulo  = '';
        this.Tarea = '';
        this.Fecha = '';
      }else{
        Swal.fire({
          icon: 'error',
          text:'Complete los campos',
        });
      }
    }
    else{
      Swal.fire({
        icon: 'error',
        text:'Complete los campos',
      });
    }
  }


  DeleteTalks(task){
    
    Swal.fire({
      title: 'Desea eliminar?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#3085d6',
      cancelButtonText:'Cancelar',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this.server.setTareaDelete(task,this.idUsuario).subscribe((data) => {
          if(data != 'no se elimino')
            this.getTasks();
          else
          Swal.fire({
            icon: 'error',
            title: 'Algo salio mal...',
            text: 'No se pudo Eliminar la tarea'
          })
        });
        this.getTasks();
      }
    })
  }

  openTaskModal(content){
    this.TituloModal = 'Nueva Tarea';
    this.TipoModal = true;
    this.modalService.open(content);
  }

  SaveTask(){
    this.modalService.dismissAll();
    this.server.setTarea(this.Titulo,this.Tarea,this.Fecha,1,this.idUsuario).subscribe((data) =>{ console.log(data)});
    this.getTasks();
    
    this.Titulo  = '';
    this.Tarea = '';
    this.Fecha = '';
  }
}
