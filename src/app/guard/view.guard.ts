import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ViewGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if user is logged in based on localStorage
    const isLoggedIn = sessionStorage.getItem('user_uid');

    // If user is logged in, navigate to dashboard
    if (!isLoggedIn) {
      // console.log('YAHA');
      this.router.navigate(['auth']);
      return false; // Prevents activating the route
    }

    return true; // Allow activating the route
  }
}
