import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

import { Observable } from 'rxjs';

import { GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat/app';

const providerGoogle = new GoogleAuthProvider();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private fireauth : AngularFireAuth, private router: Router) {
    this.user$ = this.fireauth.authState;
  }


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

  async logout() {
    await this.fireauth.signOut();
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const res = await this.fireauth.signInWithPopup(provider);

      if (res.user) {
        console.log('Успешный вход:', res.user);
        localStorage.setItem('token', 'true');
        this.router.navigate(['/shop']);

      }
    } catch (error) {
      console.error('Ошибка входа через Google:', error);
      alert('Ошибка входа');
    }
  }
}
