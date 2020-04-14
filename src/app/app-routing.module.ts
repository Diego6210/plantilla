import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from './pages/login/login.component';
import { ForgotPaswordComponent } from './pages/forgot-pasword/forgot-pasword.component';
import { IndexComponent } from './pages/index/index.component';
import { Found404Component } from './pages/found404/found404.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'ForgotPasword', 
    component: ForgotPaswordComponent 
  },
  {
    path: 'Index', 
    component: IndexComponent 
  },
  {
    path: '404', 
    component: Found404Component 
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "404"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: "enabled",
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
