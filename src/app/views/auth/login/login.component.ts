import { user } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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
  randomQuote = {
    author: 'DimKur',
    content: 'Take a break and buy a coffee',
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private todoService: TodoService,
    private snackbar: MatSnackBar
  ) {
    this.email.statusChanges.subscribe(() => {
      this.updateIsValid();
    });

    this.password.statusChanges.subscribe(() => {
      this.updateIsValid();
    });
    this.fetchRandomQuote();
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

  openSnackBar(message: string, action: string, duration: number = 2000) {
    return new Promise((resolve) => {
      const config = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      config.duration = duration;
      let snackBar = this.snackbar.open(message, action, config);
      snackBar.afterDismissed().subscribe({
        next: () => resolve(''),
        complete: () => resolve(''),
      });
    });
  }

  signIn() {
    this.authService.signIn(this.email.value, this.password.value).subscribe({
      next: (res) => {
        sessionStorage.setItem('user_uid', res.user._delegate.uid);
        sessionStorage.setItem(
          'user_displayName',
          res.user._delegate.displayName
        );

        this.openSnackBar('Login Success', 'ok!', 2000).then(() =>
          this.router.navigate(['todo'])
        );
      },
      error: (error) => {
        this.openSnackBar('Invalid Email or Password', 'ok!', 2000);
      },
    });
  }

  directToSignUp() {
    this.router.navigate(['auth/sign-up']);
  }

  fetchRandomQuote() {
    this.todoService.fetchRandomQuote().subscribe({
      next: (res: any) => {
        this.randomQuote.content = res.content;
        this.randomQuote.author = res.author;
      },
      error: () => {
        this.randomQuote.content = 'Take a break and buy a coffee';
        this.randomQuote.author = 'DimKur';
      },
    });
  }
}
