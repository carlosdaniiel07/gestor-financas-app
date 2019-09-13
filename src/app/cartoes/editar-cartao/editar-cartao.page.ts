import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartaoService } from 'src/app/services/cartao.service';
import { ActivatedRoute } from '@angular/router';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { Cartao } from 'src/app/models/cartao.model';

@Component({
  selector: 'app-editar-cartao',
  templateUrl: './editar-cartao.page.html'
})
export class EditarCartaoPage implements OnInit {

  cartaoForm: FormGroup

  cartao: Cartao = null
  dias: { value: any, label: string }[] = this.getDias()

  constructor(private fb: FormBuilder, private cartaoService: CartaoService, private activatedRoute: ActivatedRoute, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  atualizar(): void {
    this.cartao.nome = this.nome.value
    this.cartao.bandeira = this.bandeira.value
    this.cartao.diaFechamento = this.diaFechamento.value
    this.cartao.diaPagamento = this.diaPagamento.value
    this.cartao.limite = this.limite.value

    this.cartaoService.update(this.cartao).subscribe(() => this.toast.showToast('Cartão atualizado'))
  }

  private loadData(): void {
    let cartaoId: number = this.activatedRoute.snapshot.params['id']

    this.cartaoService.getById(cartaoId).subscribe((dados: Cartao) => {
      this.loadForm(dados)
      this.cartao = dados
    })
  }

  private loadForm(cartao: Cartao): void {
    this.nome.setValue(cartao.nome)
    this.bandeira.setValue(cartao.bandeira)
    this.diaFechamento.setValue(cartao.diaFechamento)
    this.diaPagamento.setValue(cartao.diaPagamento)
    this.limite.setValue(cartao.limite)
  }

  private getDias(): { value: any, label: string }[] {
    let dias: { value: any, label: string }[] = []

    for (let i = 1; i <= 31; i++) {
      dias.push({ value: i, label: i.toString() })
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
