import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { Categoria } from 'src/app/models/categoria.model';
import { Subcategoria } from 'src/app/models/subcategoria.model';
import { SubcategoriaDTO } from 'src/app/models/subcategoria.dto';

@Component({
  selector: 'app-inserir-subcategoria',
  templateUrl: './inserir-subcategoria.page.html'
})
export class InserirSubcategoriaPage implements OnInit {

  subcategoriaForm: FormGroup
  categoriasDisponiveis: Categoria[] = []

  constructor(private fb: FormBuilder, private subcategoriaService: SubcategoriaService, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
  }

  onTipoChanges(): void {
    if(this.tipo.value !== null){
      this.subcategoriaService.getCategoriasByTipo(this.tipo.value).subscribe((dados: Categoria[]) => {
        this.categoriasDisponiveis = dados
        this.categoria.enable()
      })
    }
  }

  inserir(): void {
    let subcategoria: SubcategoriaDTO = {
      nome: this.nome.value,
      categoria: this.categoriasDisponiveis.find((c: Categoria) => c.id == this.categoria.value)
    }

    this.subcategoriaService.insert(subcategoria).subscribe((dados: Subcategoria) => {
      this.toast.showToast(`Subcategoria ${dados.nome} criada`)
      this.subcategoriaForm.reset()
    })
  }

  private initForm(): void {
    this.subcategoriaForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      categoria: [{value: '', disabled: true}]
    })
  }

  get nome() { return this.subcategoriaForm.get('nome') }
  get tipo() { return this.subcategoriaForm.get('tipo') }
  get categoria() { return this.subcategoriaForm.get('categoria') }
}
