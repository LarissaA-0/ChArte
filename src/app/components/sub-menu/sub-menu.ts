import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { AsyncPipe } from '@angular/common';
import { Perfil } from '../../models/perfil';
@Component({
  selector: 'app-sub-menu',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './sub-menu.html',
  styleUrl: './sub-menu.css',
})
export class SubMenu {
  constructor(public modal: ModalService) {}

  openMenu() {
    this.modal.openModal('subMenu');
  }
}
