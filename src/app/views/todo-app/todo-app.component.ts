import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';
import { TodoService, Todo } from 'src/app/services/todo.service';
@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss', '../../app.component.scss'],
})
export class TodoAppComponent implements OnInit {
  time: string = '';
  date: string = '';
  user_uid: string = sessionStorage.getItem('user_uid') ?? '';
  todoList: Array<Todo> = [];
  isOpenDetail: boolean = false;
  selectedTodoId: string = '';
  selectedTodo: any = {
    id: 'string',
    title: 'string',
    description: 'string',
    is_done: false,
    created_at: new Date(),
    updated_at: new Date(),
    user_uid: 'string',
  };
  isEdit: boolean = false;

  constructor(private todoService: TodoService) {
    this.generateTime();
    this.todoService.getTodos(this.user_uid).subscribe({
      next: (res) => {
        this.todoList = res.sort((a, b) => {
          const updatedTimeA =
            a.updated_at.seconds * 1000 + a.updated_at.nanoseconds / 1000000;
          const updatedTimeB =
            b.updated_at.seconds * 1000 + b.updated_at.nanoseconds / 1000000;
          return updatedTimeB - updatedTimeA; // Descending order, use updatedTimeA - updatedTimeB for ascending order
        });
      },
    });

    this.todoService.fetchRandomQuote().subscribe({
      next: (res) => {
        console.log(res, 'random quote');
      },
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {}

  padZero(num: number) {
    return num < 10 ? '0' + num : num;
  }

  generateTime() {
    setInterval(() => {
      const now = new Date();
      const hours = this.padZero(now.getHours());
      const minutes = this.padZero(now.getMinutes());
      const seconds = this.padZero(now.getSeconds());
      this.time = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  }

  openDetail(todoId: string, action: string) {
    if (action === 'edit') {
      this.isEdit = true;
      const findTodo = this.todoList.filter((el) => el.id === todoId);
      this.selectedTodo = findTodo[0];
    } else {
      this.isEdit = false;
    }
    this.isOpenDetail = true;
  }

  deleteTodoById(id: string) {
    this.todoService.deleteTodo(id);
  }

  updateTodoStatus(status: boolean, id: string) {
    const payload = {
      id,
      is_done: status,
      updated_at: new Date(),
    };
    this.todoService.updateTodoStatus(payload);
  }
}
