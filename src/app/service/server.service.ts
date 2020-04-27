import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  URL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  uploadFile(archivo,user) {
    return this.http.post(`${this.URL}/upload/${user}`, archivo);
  }

  Login(user) {
    return this.http.post(`${this.URL}/Login`, JSON.stringify(user));
  }


}
