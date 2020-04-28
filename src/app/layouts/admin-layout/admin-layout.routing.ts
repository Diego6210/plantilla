import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { UsersComponent } from 'src/app/pages/users/users.component';
import { MensagesComponent } from 'src/app/pages/mensages/mensages.component';
import { TasksComponent } from 'src/app/pages/tasks/tasks.component';
import { NotificacionesComponent } from 'src/app/pages/notificaciones/notificaciones.component';
import { AssignTasksComponent } from 'src/app/pages/assign-tasks/assign-tasks.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "Administrador/users", component: UsersComponent },
  { path: "message", component: MensagesComponent },
  { path: "tasks", component: TasksComponent },  
  { path: "Administrador/notification", component: NotificacionesComponent },
  { path: "Administrador/assign-task", component: AssignTasksComponent },
];
