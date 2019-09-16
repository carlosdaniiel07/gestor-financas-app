import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html'
})
export class AlertaComponent implements OnInit {

  @Input() emptyMovimentosMessage: string

  constructor() { }

  ngOnInit() {}

}
