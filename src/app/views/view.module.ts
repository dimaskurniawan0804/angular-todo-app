import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { MainLayoutComponent } from '../assets/layouts/main/main.layout';

@NgModule({
  declarations: [ViewComponent, MainLayoutComponent],
  imports: [CommonModule, ViewRoutingModule],
})
export class ViewModule {}
