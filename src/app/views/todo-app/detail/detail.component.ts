import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TodoService, Todo } from 'src/app/services/todo.service';
import { FormControl, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnChanges {
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

  constructor(private todoService: TodoService) {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEdit']) {
      console.log('YAHA');
    }
  }

  private updateIsValid() {
    this.isValid = this.title.valid && this.description.valid;
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
    console.log(payload);
    this.todoService.updateTodo(payload);
  }

  createNewTodo() {
    // this.getErrorMessage()
    const payload = {
      id: uuidv4(),
      title: this.title.value,
      description: this.description.value,
      is_done: false,
      created_at: new Date(),
      updated_at: new Date(),
      user_uid: sessionStorage.getItem('user_uid') ?? '',
    };
    console.log(payload);
    this.todoService.addTodo(payload);
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
}
