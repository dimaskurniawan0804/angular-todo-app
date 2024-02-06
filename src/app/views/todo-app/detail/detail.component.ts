import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoService, Todo } from 'src/app/services/todo.service';
import { FormControl, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() todo: Todo = {
    id: '',
    title: '',
    description: '',
    is_done: false,
    created_at: new Date(),
    updated_at: new Date(),
    user_uid: '',
  };

  @Input() isEdit: boolean = false;

  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  isValid = false;

  constructor(private todoService: TodoService, private snackbar: MatSnackBar) {
    this.title.statusChanges.subscribe(() => {
      this.updateIsValid();
    });

    this.description.statusChanges.subscribe(() => {
      this.updateIsValid();
    });
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.title.setValue(this.todo.title);
      this.description.setValue(this.todo.description);
    }
  }

  private updateIsValid() {
    this.isValid = this.title.valid && this.description.valid;
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

  updateTodo() {
    const payload = {
      id: this.todo.id,
      title: this.title.value,
      description: this.description.value,
      is_done: this.todo.is_done,
      created_at: this.todo.created_at,
      updated_at: new Date(),
      user_uid: this.todo.user_uid,
    };
    this.todoService.updateTodo(payload).then(() => {
      this.openSnackBar('Success update this todo', 'ok!', 2000).then(() => {
        this.emitChangeTab();
        this.isEdit = false;
      });
    });
  }

  createNewTodo() {
    const payload = {
      id: uuidv4(),
      title: this.title.value,
      description: this.description.value,
      is_done: false,
      created_at: new Date(),
      updated_at: new Date(),
      user_uid: sessionStorage.getItem('user_uid') ?? '',
    };
    this.todoService.addTodo(payload).then(() => {
      this.openSnackBar('Success create new todo', 'ok!', 2000).then(() => {
        this.emitChangeTab();
        this.isEdit = false;
      });
    });
  }

  getErrorMessage(input: string) {
    if (input === 'title') {
      if (this.title.hasError('required')) {
        return 'You must enter a value';
      }
    }

    if (input === 'description') {
      if (this.description.hasError('required')) {
        return 'You must enter a value';
      }
      // return this.password.hasError('minlength') ? 'Minimal 6 characters' : '';
    }

    return;
  }

  @Output() openList = new EventEmitter<string>();
  emitChangeTab() {
    this.openList.emit('change to list');
  }
}
