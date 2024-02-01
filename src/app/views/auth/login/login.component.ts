import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  isValid = false;
  constructor(private authService: AuthService) {
    this.email.statusChanges.subscribe(() => {
      this.updateIsValid();
    });

    this.password.statusChanges.subscribe(() => {
      this.updateIsValid();
    });
  }

  private updateIsValid() {
    this.isValid = this.email.valid && this.password.valid;
  }

  ngOnInit(): void {}

  getErrorMessage(input: string) {
    if (input === 'email') {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }

      return this.email.hasError('email') ? 'Not a valid email' : '';
    }

    if (input === 'password') {
      if (this.password.hasError('required')) {
        return 'You must enter a value';
      }
      return this.password.hasError('minlength') ? 'Minimal 6 characters' : '';
    }

    return;
  }

  signIn() {
    this.authService.signIn(this.email.value, this.password.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('isLogin', 'true');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
