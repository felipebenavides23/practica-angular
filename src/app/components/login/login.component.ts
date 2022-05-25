import { LoginServices } from './../../service/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  titulo: string = 'login';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private flashMessages: FlashMessagesService,
    private LoginServices: LoginServices
  ) {}

  ngOnInit(): void {
    this.LoginServices.getauth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    this.LoginServices.Login(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.flashMessages.show(error.massage, {
          cssClass: 'alert-danger',
          timeout: 4000,
        });
      });
  }
}
