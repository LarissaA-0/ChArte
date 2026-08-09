import { Component, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-user-login-modal',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-login-modal.html',
  styleUrl: './user-login-modal.css',
})
export class UserLoginModal {
  constructor(public modal: ModalService) {}

  openLogin() {
    this.modal.openModal('login');
  }
}
