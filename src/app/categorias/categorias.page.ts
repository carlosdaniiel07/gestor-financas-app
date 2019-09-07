import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../services/categoria.service';

import { Categoria } from '../models/categoria.model';
import { ToastUtils } from '../utils/toast.utils';
import { NavController, ModalController } from '@ionic/angular';
import { Movimento } from '../models/movimento.model';
import { ListaMovimentosComponent } from '../shared/lista-movimentos/lista-movimentos.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html'
})
export class CategoriasPage implements OnInit {

  categorias: Categoria[] = []

  constructor(private navController: NavController, private categoriaService: CategoriaService, private toast: ToastUtils, private modalController: ModalController) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.loadData()
  }

  private loadData(event: any = null): void {
    this.categoriaService.getAll().subscribe((dados: Categoria[]) => {
      this.categorias = dados

      if(event !== null){
        event.target.complete()
      }
    })
  }

  getCategoriasCredito(): Categoria[] {
    return this.categorias.filter((c: Categoria) => Categoria.isCredito(c))
  }

  getCategoriasDebito(): Categoria[] {
    return this.categorias.filter((c: Categoria) => !Categoria.isCredito(c))
  }

  detalhes(categoria: Categoria): void {
    this.navController.navigateForward(`/categorias/detalhes/${categoria.id}`)
  }

  editar(categoria: Categoria): void {
    this.navController.navigateForward(`/categorias/editar/${categoria.id}`)
  }

  remover(categoria: Categoria): void {
    this.categoriaService.delete(categoria.id).subscribe(() => {
      this.categorias.splice(this.categorias.indexOf(categoria), 1)
      this.toast.showToast(`Categoria ${categoria.nome} removida`)
    })
  }

  showMovimentosModal(categoria: Categoria): void {
    this.categoriaService.getMovimentos(categoria.id).subscribe((dados: Movimento[]) => {
      this.modalController.create({
        component: ListaMovimentosComponent,
        componentProps: {
          'modal': true,
          'movimentos': dados,
          'emptyMovimentosMessage': 'Não há nenhum movimento nesta categoria'
        }
      }).then((modal) => modal.present())
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }
}