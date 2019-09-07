import { Component, OnInit } from '@angular/core';

import { SubcategoriaService } from '../services/subcategoria.service';

import { Subcategoria } from '../models/subcategoria.model';
import { NavController, ModalController } from '@ionic/angular';
import { ToastUtils } from '../utils/toast.utils';
import { Categoria } from '../models/categoria.model';
import { Movimento } from '../models/movimento.model';
import { ListaMovimentosComponent } from '../shared/lista-movimentos/lista-movimentos.component';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.page.html'
})
export class SubcategoriasPage implements OnInit {
  
  subcategorias: Subcategoria[] = []

  constructor(private subcategoriaService: SubcategoriaService, private navController: NavController, private toast: ToastUtils, private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.loadData()
  }

  detalhes(subcategoria: Subcategoria): void {
    this.navController.navigateForward(`/subcategorias/detalhes/${subcategoria.id}`)
  }

  editar(subcategoria: Subcategoria): void {
    this.navController.navigateForward(`/subcategorias/editar/${subcategoria.id}`)
  }

  remover(subcategoria: Subcategoria): void {
    this.subcategoriaService.delete(subcategoria.id).subscribe(() => {
      this.toast.showToast(`Subcategoria ${subcategoria.nome} removida`)
      this.subcategorias.splice(this.subcategorias.indexOf(subcategoria), 1)
    })
  }

  showMovimentosModal(subcategoria: Subcategoria): void {
    this.subcategoriaService.getMovimentos(subcategoria.id).subscribe((dados: Movimento[]) => {
      this.modalController.create({
        component: ListaMovimentosComponent,
        componentProps: {
          'modal': true,
          'movimentos': dados,
          'emptyMovimentosMessage': 'Não há nenhum movimento nesta subcategoria'
        }
      }).then((modal) => modal.present())
    })
  }

  getSubcategoriasCredito(): Subcategoria[] {
    return this.subcategorias.filter((subcategoria: Subcategoria) => Categoria.isCredito(subcategoria.categoria))
  }

  getSubcategoriasDebito(): Subcategoria[] {
    return this.subcategorias.filter((subcategoria: Subcategoria) => !Categoria.isCredito(subcategoria.categoria))
  }

  private loadData(event: any = null): void {
    this.subcategoriaService.getAll().subscribe((dados: Subcategoria[]) => {
      this.subcategorias = dados
      
      if(event !== null){
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }
}
