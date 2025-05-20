import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class authEmailGuard implements CanActivate {

  private allowedEmail = 'stolbnyak2003@gmail.com';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}
    canActivate(): Observable<boolean> {
        return this.afAuth.authState.pipe(
            take(1),
            map(user => !!user && user.email === this.allowedEmail),
            tap(allowed => {
                if (!allowed) {
                    if (typeof window !== 'undefined' && window.alert) {
                        window.alert('Доступ заборонено!');
                    } else {
                        console.log('Доступ заборонено!');
                    }
                    this.router.navigate(['/']);
                }
            })
        );
    }
}
