import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setStorage(Campo:string,Valor:any){
    localStorage.setItem(Campo,Valor);
  }

  getStorage(Campo:string){
    return localStorage.getItem(Campo);
  }

  removeStorage(Campo:string){
    localStorage.removeItem(Campo);
  }

  cleaStorage(){
    localStorage.clear();
  }
}
