import { Component, OnInit } from '@angular/core';
import { Beneficiario } from '../models/beneficiario.model';
import { BeneficiarioService } from '../services/beneficiario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.page.html'
})
export class BeneficiariosPage implements OnInit {

  beneficiarios: Beneficiario[] = []

  constructor(private beneficiarioService: BeneficiarioService, private navController: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  loadData(event: any = null): void {
    this.beneficiarioService.getAll().subscribe((dados: Beneficiario[]) => {
      this.beneficiarios = dados

      if(event !== null) {
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  editar(beneficiario: Beneficiario): void {
    this.navController.navigateForward(`/beneficiarios/editar/${beneficiario.id}`)
  }

  detalhes(beneficiario: Beneficiario): void {
    this.navController.navigateForward(`/beneficiarios/detalhes/${beneficiario.id}`)
  }

  remover(beneficiario: Beneficiario): void {
    this.beneficiarioService.delete(beneficiario.id).subscribe(() => this.beneficiarios.splice(this.beneficiarios.indexOf(beneficiario), 1))
  }
}
