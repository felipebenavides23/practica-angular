import { Observable, map } from 'rxjs';
import { configServices } from './../service/config.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class configguard implements CanActivate {
  constructor(private Router: Router, private configServices: configServices) {}
  canActivate(): Observable<boolean> {
    return this.configServices.getconfigedit().pipe(
      map((config) => {
        if (config.permisoRegistro) {
          return true;
        } else {
          this.Router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
