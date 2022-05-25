import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginServices } from './../../service/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  titulo: string = 'registro';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private LoginServices: LoginServices,
    private FlashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.LoginServices.getauth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  registro() {
    this.LoginServices.registra(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.FlashMessages.show(error.massage, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      });
  }
}
