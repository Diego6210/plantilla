import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { UsersComponent } from 'src/app/pages/users/users.component';
import { MensagesComponent } from 'src/app/pages/mensages/mensages.component';
import { TasksComponent } from 'src/app/pages/tasks/tasks.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "users", component: UsersComponent },
  { path: "message", component: MensagesComponent },
  { path: "tasks", component: TasksComponent },
];
