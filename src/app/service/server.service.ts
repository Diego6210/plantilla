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

  getUsuarios(){

    return this.http.get(`${this.URL}Usuario/SelectUsuario`);
  }

  setUsuario(user){
    
    const formData = new FormData();
    formData.append('user', user);

    return this.http.post(`${this.URL}Usuario/SelectUsuarioByUser`, formData);

  }

  setUsuarioIMG(img:any,user:string){

    const formData = new FormData();
    formData.append('Img', img);    
    formData.append('user', user);

    return this.http.post(`${this.URL}Usuario/setImagen`, formData);

  }


}
