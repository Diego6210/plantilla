import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permit:string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: "",
    permit:"2"
  },
  {
    path: "/Administrador/users",
    title: "Usuarios",
    icon: "icon-single-02",
    class: "",
    permit:"1"
  },
  {
    path: "/message",
    title: "Mensajes",
    icon: "icon-chat-33",
    class: "",
    permit:"2"
  },
  {
    path: "/Administrador/assign-task",
    title: "Asignar Tareas",
    icon: "icon-paper",
    class: "",
    permit:"1"
  },
  {
    path: "/tasks",
    title: "Tareas",
    icon: "icon-notes",
    class: "",
    permit:"2"
  },
  {
    path: "/Administrador/notification",
    title: "Notificaciones",
    icon: "icon-bell-55",
    class: "",
    permit:"1"
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  permiso = 1;

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
