import { Component } from '@angular/core';
import {LoginService} from "../../service/Login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showLoginComponent = false;

  constructor(private loginService : LoginService) {
  }
  toggleLoginComponent() {
    this.loginService.toggleLoginComponent()
  }
  checkLoginStatus() {
    return this.loginService.showLoginComponent;
  }
}
