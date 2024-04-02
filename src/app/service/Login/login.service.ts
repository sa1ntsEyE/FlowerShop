import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  showLoginComponent = false;

  constructor() { }

  toggleLoginComponent() {
    this.showLoginComponent = !this.showLoginComponent;
  }
}
