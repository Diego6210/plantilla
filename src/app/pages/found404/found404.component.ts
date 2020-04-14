import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'; 


@Component({
  selector: 'app-found404',
  templateUrl: './found404.component.html',
  styleUrls: ['./found404.component.scss']
})
export class Found404Component implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  Regresar(){
    this.location.back();
    //this.router.navigateByUrl('login');
  }

}
