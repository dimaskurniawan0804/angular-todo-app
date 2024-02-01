import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if user is logged in based on localStorage
    const isLoggedIn = !!localStorage.getItem('isLoggedIn');

    // If user is logged in, navigate to dashboard
    if (isLoggedIn) {
      this.router.navigate(['/dashboard']);
      return false; // Prevents activating the route
    }

    return true; // Allow activating the route
  }
}
