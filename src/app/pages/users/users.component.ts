import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private url: string = environment.Server+'imagen/';
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;

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
  columnas: string[] = ['img', 'Usuario', 'Email','nombre', 'apellido','acciones'];

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
    this.server.setUsuarios(this.Usuario ,this.Email, this.Password, this.Nombre, this.Apellidos, this.idTipoUsuario).subscribe((data) => {
      if(data['ok']){
        Swal.fire({
          icon: 'success',
          text:'Usuario agregado correctamente'
        });
        this.Usuario = '';
        this.Email= '';
        this.Password= '';
        this.Nombre= '';
        this.Apellidos= '';

        this.getDataFromSource();
        this.modalService.dismissAll();
      }else{
        Swal.fire({
          icon: 'error',
          text:'El usuario no se agrego correctamente',
        });
      }
    });
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

        this.dataSource = new MatTableDataSource(this.Usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 
 
}
