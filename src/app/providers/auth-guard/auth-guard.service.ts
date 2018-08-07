import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) {

  }

  canActivate() {
    const user: any = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;
    if (user && user.token) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
