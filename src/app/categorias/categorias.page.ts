import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../services/categoria.service';

import { Categoria } from '../models/categoria.model';
import { ToastUtils } from '../utils/toast.utils';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html'
})
export class CategoriasPage implements OnInit {

  categorias: Categoria[] = []

  constructor(private navController: NavController, private categoriaService: CategoriaService, private toast: ToastUtils) { }

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

  doRefresh(event: any): void {
    this.loadData(event)
  }
}