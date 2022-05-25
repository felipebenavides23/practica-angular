import { Observable, map } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuardian implements CanActivate {
  constructor(private Router: Router, private afauth: AngularFireAuth) {}
  canActivate(): Observable<boolean> {
    return this.afauth.authState.pipe(
      map((auth) => {
        if (!auth) {
          this.Router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
