import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view.component';
import { MainLayoutComponent } from '../assets/layouts/main/main.layout';
import { AuthGuard } from '../guard/auth.guard';
import { ViewGuard } from '../guard/view.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'todo',
        loadChildren: () =>
          import('./todo-app/todo-app.module').then((m) => m.TodoAppModule),
        canActivate: [ViewGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
