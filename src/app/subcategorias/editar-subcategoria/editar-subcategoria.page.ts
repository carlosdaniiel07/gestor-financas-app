import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { ActivatedRoute } from '@angular/router';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { Categoria } from 'src/app/models/categoria.model';
import { Subcategoria } from 'src/app/models/subcategoria.model';

@Component({
  selector: 'app-editar-subcategoria',
  templateUrl: './editar-subcategoria.page.html'
})
export class EditarSubcategoriaPage implements OnInit {

  subcategoriaForm: FormGroup
  
  subcategoria: Subcategoria
  categoriasDisponiveis: Categoria[] = []

  constructor(private fb: FormBuilder, private subcategoriaService: SubcategoriaService, private activatedRoute: ActivatedRoute, private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
    this.loadData()
  }

  atualizar(): void {
    this.subcategoria.nome = this.nome.value
    this.subcategoria.categoria = this.categoriasDisponiveis.find((c: Categoria) => c.id === this.categoria.value)

    this.subcategoriaService.update(this.subcategoria).subscribe(() => this.toast.showToast('Subcategoria atualizada'))
  }

  private loadData(): void {
    let subcategoriaId: number = this.activatedRoute.snapshot.params['id']

    this.subcategoriaService.getById(subcategoriaId).subscribe((dados: Subcategoria) => {
      this.loadForm(dados)
      this.subcategoria = dados
    })
  }

  onTipoChanges(): void {
    if(this.tipo.value !== null){
      this.subcategoriaService.getCategoriasByTipo(this.tipo.value).subscribe((dados: Categoria[]) => {
        this.categoriasDisponiveis = dados
        this.categoria.enable()
      })
    }
  }

  private initForm(): void {
    this.subcategoriaForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      categoria: [{value: '', disabled: true}]
    })
  }

  private loadForm(subcategoria: Subcategoria): void {
    this.nome.setValue(subcategoria.nome)
    this.tipo.setValue(subcategoria.categoria.tipo)
    this.categoria.setValue(subcategoria.categoria.id)
  }

  get nome() { return this.subcategoriaForm.get('nome') }
  get tipo() { return this.subcategoriaForm.get('tipo') }
  get categoria() { return this.subcategoriaForm.get('categoria') }

}
