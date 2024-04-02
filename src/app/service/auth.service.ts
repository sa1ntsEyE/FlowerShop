import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router: Router) { }

  login(email:string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then(() => {
      localStorage.setItem('token' ,'true');
    }, err => {
      alert('Something went wrong')
    })
  }

  register(email:string, password: string, confirmPassword: string, username: string) {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    this.fireauth.createUserWithEmailAndPassword(email, password).then((userCredential) =>{
      if (userCredential.user) {
        userCredential.user.updateProfile({ displayName: username }).then(() => {
          alert('Registration successful');
        }).catch(err => {
          alert('Error updating display name');
        });
      }
    }, err => {
      alert('Something went wrong')
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
    }, err => {

    })
  }
}
