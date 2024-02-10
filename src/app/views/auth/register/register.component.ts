import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from 'src/app/services/todo.service';

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
  randomQuote = {
    author: 'DimKur',
    content: 'Take a break and buy a coffee',
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private todoService: TodoService
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

    if (input === 'displayname') {
      return 'You must enter a value';
    }

    return;
  }

  signUp() {
    this.authService.signUp(this.email.value, this.password.value).subscribe({
      next: (result) => {
        result.user.updateProfile({ displayName: this.displayname.value });
        let snackBarShow = this.snackBar.open(
          'Success! You will direct to Login Page',
          'ok!',
          {
            duration: 2000,
          }
        );
        snackBarShow.afterDismissed().subscribe({
          next: () => {
            this.directToSignIn();
          },
        });
      },
      error: (err) => window.alert(err.message),
    });
  }

  directToSignIn() {
    this.router.navigate(['auth/sign-in']);
  }

  fetchRandomQuote() {
    this.todoService.fetchRandomQuote().subscribe({
      next: (res: any) => {
        this.randomQuote.content = res[0].quote;
        this.randomQuote.author = res[0].author;
      },
      error: () => {
        this.randomQuote.content = 'Take a break and buy a coffee';
        this.randomQuote.author = 'DimKur';
      },
    });
  }
}
