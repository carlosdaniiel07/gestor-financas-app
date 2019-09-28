import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-other-options',
  templateUrl: './menu-other-options.component.html'
})
export class MenuOtherOptionsComponent implements OnInit {

  appPagesCadastros: any[] = [
    {title: 'Contas', icon: 'bookmarks', link: '/contas'},
    {title: 'Categorias', icon: 'pricetag', link: '/categorias'},
    {title: 'Subcategorias', icon: 'pricetags', link: '/subcategorias'},
    {title: 'Tipos de conta', icon: 'document', link: '/tipos-conta'},
    {title: 'Projetos', icon: 'briefcase', link: '/projetos'},
    {title: 'Beneficiários', icon: 'contacts', link: '/beneficiarios'}
  ]

  appPagesOutros: any[] = [
    //{title: 'Cobranças', icon: 'clipboard', link: '/cobrancas'},
    //{title: 'Transferências', icon: 'repeat', link: '/transferencias'}
  ]

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  hasPagesCadastros(): boolean {
    return this.appPagesCadastros.length > 0
  }

  hasPagesOutros(): boolean {
    return this.appPagesOutros.length > 0
  }

  closeMenu(): void {
    this.popoverController.dismiss()
  }
}
