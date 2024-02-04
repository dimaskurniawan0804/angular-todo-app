import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { MainLayoutComponent } from '../assets/layouts/main/main.layout';
import { AuthGuard } from '../guard/auth.guard';
import { ViewGuard } from '../guard/view.guard';

@NgModule({
  declarations: [ViewComponent, MainLayoutComponent],
  imports: [CommonModule, ViewRoutingModule],
  providers: [AuthGuard, ViewGuard],
})
export class ViewModule {}
