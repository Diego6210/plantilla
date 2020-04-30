import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { LoginComponent } from './pages/login/login.component';
import { WebcamModule } from 'ngx-webcam';
import { BrowserModule } from '@angular/platform-browser';
import { UsersComponent } from './pages/users/users.component';

import { DataTablesModule } from 'angular-datatables';
import { ForgotPaswordComponent } from './pages/forgot-pasword/forgot-pasword.component';
import { IndexComponent } from './pages/index/index.component';
import { Found404Component } from './pages/found404/found404.component';
import { MensagesComponent } from './pages/mensages/mensages.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ServerService } from './service/server.service';
import { ServerSocketService } from './service/server-socket.service';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { AssignTasksComponent } from './pages/assign-tasks/assign-tasks.component';



import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    WebcamModule,
    DataTablesModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent, UsersComponent, ForgotPaswordComponent, IndexComponent, Found404Component, MensagesComponent, TasksComponent, NotificacionesComponent, AssignTasksComponent],
  providers: [ServerService,ServerSocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
