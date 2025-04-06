import { Component, inject } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { LoginService} from '../../service/Login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth: AuthService = inject(AuthService);
  private loginService : LoginService = inject(LoginService);

  email:string = '';
  password: string = '';
  username: string = '';
  confirmPassword: string = '';
  showLoginOrRegister = true;
  constructor() {}

  login() {
    if (this.email == ''){
      alert('Please enter Email');
      return;
    }

    if (this.password == ''){
      alert('Please enter Password');
      return;
    }

    this.auth.login(this.email,this.password);
    this.email = '';
    this.password= '';
  }

  register() {
    if (this.username == ''){
      alert('Please enter Username');
      return;
    }

    if (this.email == ''){
      alert('Please enter Email');
      return;
    }

    if (this.password == ''){
      alert('Please enter Password');
      return;
    }

    if (this.confirmPassword == ''){
      alert('Please enter Confirm Password');
      return;
    }

    this.auth.register(this.email,this.password, this.confirmPassword, this.username);
    this.email = '';
    this.password = '';
    this.username = '';
    this.confirmPassword = '';
  }

  showLogin() {
    this.showLoginOrRegister = true;
  }

  showRegister() {
    this.showLoginOrRegister = false;
  }

  toggleLoginComponent() {
    this.loginService.toggleLoginComponent()
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle();
    this.toggleLoginComponent();
  }
}
