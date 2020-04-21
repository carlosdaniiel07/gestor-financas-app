import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContaService } from 'src/app/services/conta.service';
import { TipoContaService } from 'src/app/services/tipo-conta.service';
import { ActivatedRoute } from '@angular/router';
import { Conta } from 'src/app/models/conta.model';
import { TipoConta } from 'src/app/models/tipo-conta.model';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-editar-conta',
  templateUrl: './editar-conta.page.html'
})
export class EditarContaPage implements OnInit {

  contaForm: FormGroup

  contaObj: Conta
  tiposConta: TipoConta[] = []

  constructor(private fb: FormBuilder, private contaService: ContaService, private tipoContaService: TipoContaService, private activatedRoute: ActivatedRoute, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  atualizar(): void {
    this.contaObj.nome = this.nome.value
    this.contaObj.banco = this.banco.value
    this.contaObj.agencia = this.agencia.value
    this.contaObj.conta = this.conta.value
    this.contaObj.tipo = this.tiposConta.find((t: TipoConta) => t.id === this.tipo.value)
    this.contaObj.saldoInicial = this.saldoInicial.value
    this.contaObj.compoemSaldo = this.compoemSaldo.value

    this.contaService.update(this.contaObj).subscribe(() => this.toast.showToast('Conta atualizada'))
  }

  private loadData(event: any = null): void {
    let contaId: number = this.activatedRoute.snapshot.params['id']

    this.contaService.getById(contaId).subscribe((dados: Conta) => {
      this.loadForm(dados)
      this.contaObj = dados
    })

    this.tipoContaService.getAll().subscribe((dados: TipoConta[]) => {
      this.tiposConta = dados

      if(event !== null){
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  private initForm(): void {
    this.contaForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      banco: ['', Validators.required],
      agencia: ['', Validators.required],
      conta: ['', Validators.required],
      saldo: [{value: '', disabled: true}],
      compoemSaldo: [true, Validators.required],
      saldoInicial: ['']
    })
  }

  private loadForm(conta: Conta): void {
    this.nome.setValue(conta.nome)
    this.tipo.setValue(conta.tipo.id)
    this.banco.setValue(conta.banco)
    this.agencia.setValue(conta.agencia)
    this.conta.setValue(conta.conta)
    this.saldo.setValue(conta.saldo.toFixed(2))
    this.saldoInicial.setValue(conta.saldoInicial)
    this.compoemSaldo.setValue(conta.compoemSaldo)
  }

  get nome() { return this.contaForm.get('nome') }
  get tipo() { return this.contaForm.get('tipo') }
  get banco() { return this.contaForm.get('banco') }
  get agencia() { return this.contaForm.get('agencia') }
  get conta() { return this.contaForm.get('conta') }
  get saldo() { return this.contaForm.get('saldo') }
  get saldoInicial() { return this.contaForm.get('saldoInicial') }
  get compoemSaldo() { return this.contaForm.get('compoemSaldo') }
}
