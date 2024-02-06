import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoAppRoutingModule } from './todo-app-routing.module';
import { TodoAppComponent } from './todo-app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetailComponent } from './detail/detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [TodoAppComponent, DetailComponent],
  imports: [
    CommonModule,
    TodoAppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
})
export class TodoAppModule {}
