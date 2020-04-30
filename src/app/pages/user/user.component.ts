import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  constructor(    
    private storage: LocalStorageService,
    private server:ServerService
  ) {
  
  }

  imgdefault = this.storage.getStorage('Img');
  cheange = false;
  
  permisosUsuario = this.storage.getStorage('TipoUsuario');
  Username:string;
  Apellidos:string;
  Nombre:string;
  Email:string;
  Password:string;

  IMG:string;
  formData = new FormData();
  TipoUsuario=[];
  id = 0;
  idTipoUsuario;

  ngOnInit() {
    this.Username = this.storage.getStorage('User');
    this.getTipoUsuarios();
    this.getUsuario();
  }

  getUsuario(){
    this.server.getUsuariobyUsuario(this.Username).subscribe((data) => {
      this.Apellidos = data['Usuario'][0].Apellido;
      this.Nombre = data['Usuario'][0].Nombre;
      this.Email = data['Usuario'][0].Email;
    });
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

  GuardarCambios(){
    alert(this.Password +'-'+this.Username +'-'+this.idTipoUsuario);
  }

  onChange($event,Archivo: FileList){
    //console.log($event);

    
    //console.log(Archivo);
    var estencion = Archivo[0].name.split('.', 2)
    //console.log(estencion[1]);
    this.IMG = this.Username+'.'+estencion[1];

    if ($event.target.files) {
      var reader = new FileReader();

      reader.onload = ($event:any) => {
        this.imgdefault = $event.target.result;
      }
      this.cheange = true;
      reader.readAsDataURL($event.target.files[0]);
      

      this.formData.delete('archivo');
      this.formData.append('archivo', Archivo[0]);

    }
  }

  capturar() {
    this.idTipoUsuario = this.id;
  }
  
  onSubmit() {
    this.server.uploadFile(this.formData,this.Username).subscribe((data) =>{ console.log(data)});
    
    this.server.setUsuarioIMG(this.IMG,this.Username).subscribe((data) => {console.log(data)});
    this.cheange = false;

  }  
}