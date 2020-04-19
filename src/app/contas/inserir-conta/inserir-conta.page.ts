import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContaService } from 'src/app/services/conta.service';
import { TipoContaService } from 'src/app/services/tipo-conta.service';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { TipoConta } from 'src/app/models/tipo-conta.model';
import { ContaDTO } from 'src/app/models/conta.dto';
import { Conta } from 'src/app/models/conta.model';

@Component({
  selector: 'app-inserir-conta',
  templateUrl: './inserir-conta.page.html'
})
export class InserirContaPage implements OnInit {

  contaForm: FormGroup
  tiposConta: TipoConta[] = []

  constructor(private fb: FormBuilder, private contaService: ContaService, private tipoContaService: TipoContaService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadTiposConta()
  }

  private loadTiposConta(event: any = null): void {
    this.tipoContaService.getAll().subscribe((dados: TipoConta[]) => {
      this.tiposConta = dados
      
      if(event !== null){
        event.target.complete()
      }
    })
  }

  inserir(): void {
    let conta: ContaDTO = { 
      nome: this.nome.value, 
      banco: this.banco.value, 
      agencia: this.agencia.value,
      conta: this.conta.value,
      saldoInicial: this.saldoInicial.value,
      compoemSaldo: this.compoemSaldo.value,
      tipo: this.tiposConta.find((t: TipoConta) => t.id === this.tipo.value) 
    }

    this.contaService.insert(conta).subscribe((dados: Conta) => {
      this.contaForm.reset()
      this.toast.showToast(`Conta ${conta.nome} criada`)
    })    
  }

  doRefresh(event: any): void {
    this.loadTiposConta(event)
  }

  private initForm(): void {
    this.contaForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      banco: ['', Validators.required],
      agencia: ['', Validators.required],
      conta: ['', Validators.required],
      compoemSaldo: [true, Validators.required],
      saldoInicial: ['']
    })
  }

  get nome() { return this.contaForm.get('nome') }
  get tipo() { return this.contaForm.get('tipo') }
  get banco() { return this.contaForm.get('banco') }
  get agencia() { return this.contaForm.get('agencia') }
  get conta() { return this.contaForm.get('conta') }
  get saldoInicial() { return this.contaForm.get('saldoInicial') }
  get compoemSaldo() { return this.contaForm.get('compoemSaldo') }
}
