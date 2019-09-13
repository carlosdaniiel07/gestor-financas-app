import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartaoService } from 'src/app/services/cartao.service';
import { CartaoDTO } from 'src/app/models/cartao.dto';
import { Cartao } from 'src/app/models/cartao.model';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-inserir-cartao',
  templateUrl: './inserir-cartao.page.html'
})
export class InserirCartaoPage implements OnInit {

  cartaoForm: FormGroup
  dias: {value: any, label: string}[] = this.getDias()

  constructor(private fb: FormBuilder, private cartaoService: CartaoService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
  }

  inserir(): void {
    let cartao: CartaoDTO = {
      nome: this.nome.value,
      bandeira: this.bandeira.value,
      diaFechamento: this.diaFechamento.value,
      diaPagamento: this.diaPagamento.value,
      limite: this.limite.value
    }

    this.cartaoService.insert(cartao).subscribe((dados: Cartao) => {
      this.cartaoForm.reset()
      this.toast.showToast(`Cartão ${cartao.nome} criado`)
    })
  }

  private getDias(): {value: any, label: string}[] {
    let dias: {value: any, label: string}[] = []

    for(let i = 1; i <= 31; i++){
      dias.push({value: i, label: i.toString()})
    }

    return dias
  }

  private initForm(): void {
    this.cartaoForm = this.fb.group({
      nome: ['', Validators.required],
      bandeira: ['', Validators.required],
      diaFechamento: ['', Validators.required],
      diaPagamento: ['', Validators.required],
      limite: ['', Validators.required]
    })
  }

  get nome() { return this.cartaoForm.get('nome') }
  get bandeira() { return this.cartaoForm.get('bandeira') }
  get diaFechamento() { return this.cartaoForm.get('diaFechamento') }
  get diaPagamento() { return this.cartaoForm.get('diaPagamento') }
  get limite() { return this.cartaoForm.get('limite') }
}
