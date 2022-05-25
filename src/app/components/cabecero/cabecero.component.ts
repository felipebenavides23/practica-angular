import { configServices } from './../../service/config.service';
import { Router } from '@angular/router';
import { LoginServices } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css'],
})
export class CabeceroComponent implements OnInit {
  islogeding: boolean;
  loggedinuser: string;
  permitirconifg: boolean;

  constructor(
    private LoginServices: LoginServices,
    private Router: Router,
    private configServices: configServices
  ) {}

  ngOnInit(): void {
    this.LoginServices.getauth().subscribe((auth) => {
      if (auth) {
        this.islogeding = true;
        this.loggedinuser = auth.email;
      } else {
        this.islogeding = false;
      }
    });

    this.configServices.getconfigedit().subscribe((config) => {
      this.permitirconifg = config.permisoRegistro;
    });
  }

  salir() {
    this.LoginServices.salir();
    this.islogeding = false;
    this.loggedinuser = '';
    this.Router.navigate(['/login']);
  }
}
