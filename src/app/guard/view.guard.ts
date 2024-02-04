import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ViewGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = sessionStorage.getItem('user_uid');

    if (!isLoggedIn) {
      this.router.navigate(['auth']);
      return false;
    }

    return true;
  }
}
