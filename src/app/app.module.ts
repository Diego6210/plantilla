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
import {WebcamModule} from 'ngx-webcam';
import {BrowserModule} from '@angular/platform-browser';
import { UsersComponent } from './pages/users/users.component';

import { DataTablesModule } from 'angular-datatables';
import { ForgotPaswordComponent } from './pages/forgot-pasword/forgot-pasword.component';
import { IndexComponent } from './pages/index/index.component';
import { Found404Component } from './pages/found404/found404.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
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
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent, UsersComponent, ForgotPaswordComponent, IndexComponent, Found404Component],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
