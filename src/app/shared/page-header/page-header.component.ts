import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent implements OnInit {
  @Input() headerName: string = ''
  @Input() showMenuButton: boolean = true

  constructor() { }

  ngOnInit() {}
}
