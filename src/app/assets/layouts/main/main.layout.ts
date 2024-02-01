import { Component } from '@angular/core';

@Component({
  selector: 'main-layout',
  styleUrls: ['./main.layout.scss'],
  template: `
    <div id="main-layout-wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class MainLayoutComponent {}
