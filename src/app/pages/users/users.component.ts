import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ServerService } from 'src/app/service/server.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private url: string = environment.Server+'imagen/';

  Usuarios = [];
  TipoUsuario=[];
  id = 0;
  idTipoUsuario;

  Usuario:string;
  Apellidos:string;
  Nombre:string;
  Email:string;
  Password:string;


  TituloModal:string = 'Agregar Usuario';
  TipoModal:boolean = true;

  /*  
  {
      Usuario:'diego',
      img:'https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg',
      nombre:'diego',
      apellido:'garcia',
      id:1      
    }
    */

  dtOptions: any;
  
  
  @ViewChild('dataTable', {static: true}) table;
  
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private server:ServerService
  ) { }
  

  openLg(content) {
    this.TituloModal = 'Agregar Usuario';
    this.TipoModal = true;
    
    this.modalService.open(content, { size: 'lg' });
  }

  Agregar(from, align){
    let status = false;
    Swal.fire({
      icon: 'success',
      text:'Usuario agregado correctamente'
    });

    Swal.fire({
      icon: 'error',
      text:'El usuario no se agrego correctamente',
    });
    this.modalService.dismissAll();
  }


  Delet(idUser){
    Swal.fire({
      title: 'Desea eliminar el usuario?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#3085d6',
      cancelButtonText:'Cancelar',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this.server.setUsuarioDelete(idUser).subscribe((data) => {
          if(data == 'se elimino')
            this.getDataFromSource();
          else{
            Swal.fire({
              icon: 'error',
              title: 'Algo salio mal...',
              text: 'No se pudo Eliminar la tarea'
            });
          }
        });
        this.getDataFromSource();
      }
    })
  }

  getTipoUsuarios(){
    this.server.getTipoUsuario().subscribe((data) => {
      this.TipoUsuario = [];
      for(let i = 0; i < data['Usuario'].length; i++){

        this.TipoUsuario.push({
          
          Descripcion:data['Usuario'][i].Descripcion,
          Id:data['Usuario'][i].IdTipoUsuario

        });
      }
    });
  }

  Edits(idUser,content){
    this.TituloModal = 'Editar Usuario';
    this.TipoModal = false;
    this.modalService.open(content, { size: 'lg' });
    this.server.getUsuariobyIdUsuario(idUser).subscribe((data) => {
      this.Usuario = data['Usuario'][0].Usuario;
      this.Apellidos = data['Usuario'][0].Apellido;
      this.Nombre = data['Usuario'][0].Nombre;
      this.Email = data['Usuario'][0].Email;
    })
  }
  
  ngOnInit(): void {
    this.getDataFromSource();
    this.getTipoUsuarios();
  }

  capturar() {
    this.idTipoUsuario = this.id;
  }

  getDataFromSource() {
    this.server.getUsuarios().subscribe((data) => {
      this.Usuarios = [];
      for(let i = 0; i < data['Usuario'].length; i++){

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

   /*this.dtOptions = {
      language: {
        "lengthMenu": "Mostrando _MENU_ registros por pag.",
        "zeroRecords": "Sin Datos - disculpa",
        "info": "Motrando pag. _PAGE_ de _PAGES_",
        "infoEmpty": "Sin registros disponibles",
        "infoFiltered": "(filtrado de _MAX_ total)"
    }
    };

    this.dtOptions = {
      destroy:true,
      serverSide: true,
      processing: true,
      ajax:this.server.getUsuarios().subscribe(resp => {
        this
      }) ,
      language: {
          "lengthMenu": "Mostrando _MENU_ registros por pag.",
          "zeroRecords": "Sin Datos - disculpa",
          "info": "Motrando pag. _PAGE_ de _PAGES_",
          "infoEmpty": "Sin registros disponibles",
          "infoFiltered": "(filtrado de _MAX_ total)"
      },
  
      "columnDefs":[
        {
            "targets":0, "data":"img", "render": function(data,type,row,meta)
            {
              console.log(data);
              return '<img src="'+row['img']+'" width="50px" alt="user"class="rounded-circle">';

            }
          },
        {
            "targets":4, "data":"id", "render": function(data,type,row,meta)
            {
              return '<button (click)="Edits(user.id)" class=" btn btn-success btn-link btn-sm btn-icon" tooltip="Refresh" type="button" aria-describedby="tooltip-142"><i class=" tim-icons icon-pencil"></i></button>'+
              '<button (click)="Delet(user.id)" class=" btn btn-danger btn-link btn-sm" tooltip="Delete" type="button" aria-describedby="tooltip-143"><i class=" tim-icons icon-simple-remove"></i></button>';
            }
        }
      ],
      columns: [
              { title: 'Usuario', "data": "Usuario" },
              { title: 'First name', "data": "nombre" },
              { title: 'Last name', "data": "apellido" }
          ]
    };*/
  }
 
}
