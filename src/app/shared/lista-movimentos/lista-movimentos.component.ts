import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Movimento } from 'src/app/models/movimento.model';
import { MovimentoService } from 'src/app/services/movimento.service';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-lista-movimentos',
  templateUrl: './lista-movimentos.component.html',
  styleUrls: ['./lista-movimentos.component.scss'],
})
export class ListaMovimentosComponent implements OnInit {

  @Input() modal: boolean = false
  @Input() movimentos: Movimento[] = []
  @Input() emptyMovimentosMessage: string = 'Não há movimentação nesta conta'

  constructor(private modalController: ModalController, private navController: NavController, private movimentoService: MovimentoService, private toast: ToastUtils) { }

  ngOnInit() { }

  ionViewWillEnter() {
    // Ordena os movimentos por data de contabilização (do mais recente para o mais antigo)
    this.movimentos = this.movimentos.sort(Movimento.sortByDataContabilizacaoDesc)
  }

  closeModal(): void {
    if(this.modal){
      this.modalController.dismiss()
    }
  }
  
  hasMovimentos(): boolean {
    return this.movimentos.length !== 0
  }

  detalhes(movto: Movimento): void {
    this.closeModal()
    this.navController.navigateForward(`/movimentos/detalhes/${movto.id}`)
  }

  editar(movto: Movimento): void {
    this.closeModal()
    this.navController.navigateForward(`/movimentos/editar/${movto.id}`)
  }

  remover(movto: Movimento): void {
    this.movimentoService.delete(movto.id).subscribe(() => {
      this.movimentos.splice(this.movimentos.indexOf(movto), 1)
      this.toast.showToast('Movimento removido')
    })
  }

  clonar(movto: Movimento): void {
    let novoMovimento = Object.assign({}, movto)

    novoMovimento.id = null
    novoMovimento.dataContabilizacao = DateUtils.toApiPattern(DateUtils.getNowAsJson())

    this.movimentoService.insert(novoMovimento).subscribe((dados: Movimento) => 
      this.toast.showToast('Movimento clonado com sucesso')
    )
  }

  alterarValor(obj: { old: Movimento, new: Movimento }): void {    
    if (obj.old.valor !== obj.new.valor){
      this.movimentoService.update(obj.new).subscribe(() => {
        this.toast.showToast(`Valor atualizado`)
        
        obj.old.valor = obj.new.valor
        obj.old.valorTotal = Movimento.getValorTotal(obj.new)
      })
    } else {
      this.toast.showErrorToast('Não é necessário alterar pois os valores são iguais')
    }
  }
}
