import { map } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginServices {
  constructor(private AngularFireAuth: AngularFireAuth) {}

  Login(email: string, pass: string) {
    return new Promise((resolve, rejects) => {
      this.AngularFireAuth.signInWithEmailAndPassword(email, pass).then(
        (datos) => resolve(datos),
        (error) => rejects(error)
      );
    });
  }

  getauth() {
    return this.AngularFireAuth.authState.pipe(map((auth) => auth));
  }

  salir() {
    this.AngularFireAuth.signOut();
  }

  registra(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AngularFireAuth.createUserWithEmailAndPassword(email, password).then(
        (datos) => resolve(datos),
        (error) => reject(error)
      );
    });
  }
}
