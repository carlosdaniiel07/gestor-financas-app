import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cobranca } from 'src/app/models/cobranca.model';
import { Conta } from 'src/app/models/conta.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Subcategoria } from 'src/app/models/subcategoria.model';
import { Projeto } from 'src/app/models/projeto.model';
import { Cartao } from 'src/app/models/cartao.model';
import { Fatura } from 'src/app/models/fatura.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CobrancaService } from 'src/app/services/cobranca.service';
import { ContaService } from 'src/app/services/conta.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProjetoService } from 'src/app/services/projeto.service';
import { CartaoService } from 'src/app/services/cartao.service';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { CobrancaRemocaoDTO } from 'src/app/models/cobranca-remocao.dto';

@Component({
  selector: 'app-remover-cobranca',
  templateUrl: './remover-cobranca.page.html'
})
export class RemoverCobrancaPage implements OnInit {

  cobrancaForm: FormGroup
  cobranca: Cobranca

  contas: Conta[] = []
  categorias: Categoria[] = []
  subcategorias: Subcategoria[] = []
  projetos: Projeto[] = []
  
  constructor(private fb: FormBuilder, 
              private activatedRoute: ActivatedRoute,
              private navController: NavController, 
              private cobrancaService: CobrancaService,
              private contaService: ContaService,
              private categoriaService: CategoriaService,
              private projetoService: ProjetoService,
              private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  onCategoriaChange(event: any): void {
    if(this.categoria.value !== null && this.categoria.value !== ''){
      let categoriaId: number = this.categoria.value

      this.categoriaService.getSubcategorias(categoriaId).subscribe((dados: Subcategoria[]) => {
        this.subcategorias = dados
        
        if(dados.length === 0){
          this.toast.showToast('Não há nenhuma subcategoria para esta categoria')
          this.subcategoria.disable()
        } else {
          this.subcategoria.enable()
        }
      })
    }
  }

  removerCobranca(): void {
    let cobranca: CobrancaRemocaoDTO = {
      cobranca: this.cobranca,
      conta: this.contas.find((c: Conta) => c.id === this.conta.value),
      categoria: this.categorias.find((c: Categoria) => c.id === this.categoria.value),
      subcategoria: this.subcategorias.find((s: Subcategoria) => s.id === this.subcategoria.value),
      projeto: this.projetos.find((p: Projeto) => p.id === this.projeto.value)
    }

    this.cobrancaService.delete(cobranca).subscribe(() => {
      this.toast.showToast('Cobrança removida')
      this.navController.navigateForward(`/cobrancas`)
    })
  }

  private loadData(event: any = null): void {
    // Carrega os dados da cobrança
    let cobrancaId: number = this.activatedRoute.snapshot.params['id']

    this.cobrancaService.getById(cobrancaId).subscribe((dados: Cobranca) => {
      this.cobranca = dados
      
      this.descricao.setValue(dados.descricao)
      this.saldo.setValue(Cobranca.getValorPago(dados))
    })

    // Carrega outros dados
    this.contaService.getAll().subscribe((dados: Conta[]) => this.contas = dados)
    this.categoriaService.getAll().subscribe((dados: Categoria[]) => this.categorias = dados)
    this.projetoService.getAll().subscribe((dados: Projeto[]) => {
      this.projetos = dados
    
      if(event !== null){
        event.target.complete()
      }
    })
  }

  private initForm(): void {
    this.cobrancaForm = this.fb.group({
      descricao: ['', Validators.required],
      conta: ['', Validators.required],
      saldo: ['', Validators.required],
      categoria: [''],
      subcategoria: [{value: '', disabled: true}],
      projeto: [''],
    })
  }

  get descricao() { return this.cobrancaForm.get('descricao') }
  get conta() { return this.cobrancaForm.get('conta') }
  get saldo() { return this.cobrancaForm.get('saldo') }
  get categoria() { return this.cobrancaForm.get('categoria') }
  get subcategoria() { return this.cobrancaForm.get('subcategoria') }
  get projeto() { return this.cobrancaForm.get('projeto') }
}
