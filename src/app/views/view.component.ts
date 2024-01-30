import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
