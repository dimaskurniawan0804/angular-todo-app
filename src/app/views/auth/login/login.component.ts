import { user } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { v4 as uuidv4 } from 'uuid';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private todoService: TodoService
  ) {
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

  ngOnInit(): void {
    // console.log(this.todoService.getTodos());
    this.todoService.getTodos('KM2PKsOQfEXAgwCFp1lDuXbZ6R92').subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

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
        sessionStorage.setItem('user_uid', res.user._delegate.uid);
        sessionStorage.setItem(
          'user_displayName',
          res.user._delegate.displayName
        );

        this.router.navigate(['todo']);

        // this.todoService.addTodo({
        //   title: 'Test Title New',
        //   description: 'YAHA TEST',
        //   is_done: false,
        //   created_at: new Date(),
        //   updated_at: new Date(),
        //   user_uid: sessionStorage.getItem('user_uid') ?? '',
        //   id: uuidv4(),
        // });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
