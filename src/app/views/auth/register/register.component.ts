import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  displayname = new FormControl('', [Validators.required]);
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

    if (input === 'displayname') {
      return 'You must enter a value';
    }

    return;
  }

  signUp() {
    this.authService.signUp(this.email.value, this.password.value).subscribe({
      next: (result) => {
        result.user.updateProfile({ displayName: this.displayname.value });
      },
      error: (err) => window.alert(err.message),
    });
  }
}
