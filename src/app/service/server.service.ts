import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private URL: string = environment.Server;

  constructor(private http: HttpClient) { }

  uploadFile(archivo,user) {
    return this.http.post(`${this.URL}upload/${user}`, archivo);
  }

  getUsuariobyUsuario(user){

    const formData = new FormData();
    formData.append('user', user);

    return this.http.post(`${this.URL}Usuario/SelectUsuarioByUser`, formData);
  }

  getUsuariobyIdUsuario(iduser){

    const formData = new FormData();
    formData.append('iduser', iduser);

    return this.http.post(`${this.URL}Usuario/SelectUsuarioByIdUser`, formData);
  }

  getUsuarios(){

    return this.http.get(`${this.URL}Usuario/SelectUsuario`);
  }

  getUsuariosAll(){

    return this.http.get(`${this.URL}Usuario/SelectUsuariosAll`);
  }

  setUsuarios(Usuario ,Email, Password, Nombre, Apellido, TipoUsuario){
    
    const formData = new FormData();
    formData.append('Usuario', Usuario);
    formData.append('Email', Email);
    formData.append('Password', Password);
    formData.append('Nombre', Nombre);
    formData.append('Apellido', Apellido);
    formData.append('TipoUsuario', TipoUsuario);

    return this.http.post(`${this.URL}Usuario/setUsuario`, formData);

  }

  setUsuarioIMG(img:any,user:string){

    const formData = new FormData();
    formData.append('Img', img);    
    formData.append('user', user);

    return this.http.post(`${this.URL}Usuario/setImagen`, formData);

  }


  setTarea(Titulo,Tarea,Fecha,Completado,IdUsuario){
    
    const formData = new FormData();
    formData.append('Titulo', Titulo);
    formData.append('Tarea', Tarea);
    formData.append('Fecha', Fecha);
    formData.append('Completado', Completado);
    formData.append('IdUsuario', IdUsuario);

    return this.http.post(`${this.URL}Tasks/setTarea`, formData);

  }

  setTareaUpdate(Titulo,Tarea,Fecha,IdTarea,IdUsuario){
    
    const formData = new FormData();
    formData.append('Titulo', Titulo);
    formData.append('Tarea', Tarea);
    formData.append('Fecha', Fecha);
    formData.append('IdTarea', IdTarea);
    formData.append('IdUsuario', IdUsuario);

    return this.http.post(`${this.URL}Tasks/setTareaUpdate`, formData);

  }

  getTareasbyuser(user){

    const formData = new FormData();
    formData.append('user', user);

    return this.http.post(`${this.URL}Tasks/SelectTareasByUser`, formData);
  }

  setTareaChange(Completado,IdTarea,IdUsuario){
    
    const formData = new FormData();
    formData.append('Completado', Completado);
    formData.append('IdTarea', IdTarea);
    formData.append('IdUsuario', IdUsuario);

    return this.http.post(`${this.URL}Tasks/setTareaChange`, formData);

  }

  getTareasbyID(IdTarea){

    const formData = new FormData();
    formData.append('IdTarea', IdTarea);

    return this.http.post(`${this.URL}Tasks/SelectTareasByID`, formData);
  }

  setTareaDelete(task,user){

    const formData = new FormData();
    formData.append('user', user);    
    formData.append('IdTarea', task);

    return this.http.post(`${this.URL}Tasks/setDeleteTarea`, formData);
  }

  setUsuarioDelete(IdUsuario){

    const formData = new FormData();
    formData.append('IdUsuario', IdUsuario);

    return this.http.post(`${this.URL}Usuario/setDeleteUsuario`, formData);
  }

  getTipoUsuario(){

    return this.http.get(`${this.URL}Usuario/getTipoUsuario`);
  }

  setChat(IdUsuario1,IdUsuario2){

    const formData = new FormData();
    formData.append('IdUsuario1', IdUsuario1);    
    formData.append('IdUsuario2', IdUsuario2);

    return this.http.post(`${this.URL}Chat/setChats`, formData);
  }

  getChats(IdUsuario){

    const formData = new FormData();   
    formData.append('IdUsuario', IdUsuario);

    return this.http.post(`${this.URL}Chat/getChats`, formData);
  }


  getChatsMensajes(IdChats){

    const formData = new FormData();   
    formData.append('IdChats', IdChats);

    return this.http.post(`${this.URL}Chat/getChatsMensajesByUser`, formData);
  }

  setChatMensaje(IdUsuario,IdChats,Mensaje){

    const formData = new FormData();
    formData.append('IdUsuario', IdUsuario);    
    formData.append('IdChats', IdChats);   
    formData.append('Mensaje', Mensaje);

    return this.http.post(`${this.URL}Chat/setChatMensaje`, formData);
  }



}
