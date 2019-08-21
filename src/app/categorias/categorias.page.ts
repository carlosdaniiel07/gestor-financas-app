import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html'
})
export class CategoriasPage implements OnInit {

  categorias: Categoria[] = []

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getAll().subscribe((dados: Categoria[]) => console.log(dados))
  }
}
