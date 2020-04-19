import { Component, OnInit, Input } from '@angular/core';
import { SaldoItemDTO } from 'src/app/models/saldo-item.dto';

@Component({
  selector: 'app-detalhes-saldo-item',
  templateUrl: './detalhes-saldo-item.component.html'
})
export class DetalhesSaldoItemComponent implements OnInit {

  @Input() item: SaldoItemDTO[]

  constructor() { }

  ngOnInit() {}

}
