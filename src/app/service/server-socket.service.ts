import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerSocketService {
  
  socket: any;
  readonly url = environment.Server;

  constructor() { 
    this.socket = io(this.url);
  }


  listen(eventName:string){
    return new Observable((susbcriber) =>{
      this.socket.on(eventName, (data) =>{
        susbcriber.next(data);
      })
    })
  }

  emit(eventName:string, data:any){
    this.socket.emit(eventName,data);
  }

}
