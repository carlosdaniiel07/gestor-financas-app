import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent implements OnInit {
  @Input() headerName: string = ''
  @Input() showMenuButton: boolean = true
  @Input() showCloseButton: boolean = false

  @Output() closeEventEmitter = new EventEmitter()

  constructor(private authService: AuthService, private navController: NavController) { }

  ngOnInit() {}

  close(): void {
    this.closeEventEmitter.emit()
  }
}
