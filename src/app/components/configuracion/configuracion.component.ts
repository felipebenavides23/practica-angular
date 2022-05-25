import { config } from './../../model/config.model';
import { configServices } from './../../service/config.service';
import { LoginServices } from './../../service/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent implements OnInit {
  info = {
    titulo: 'configracion',
    icono: 'fa-solid fa-clipboard-check',
  };

  editar: config = {
    permisoRegistro: false,
  };

  constructor(private router: Router, private configServices: configServices) {}

  ngOnInit(): void {
    this.configServices.getconfigedit().subscribe((config) => {
      this.editar.permisoRegistro = config.permisoRegistro;
    });
  }

  guardar() {
    console.log(this.editar);
    this.configServices.editarConfig(this.editar);
    this.router.navigate(['/']);
  }
}
