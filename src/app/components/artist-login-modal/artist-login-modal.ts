import { Component, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-artist-login-modal',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './artist-login-modal.html',
  styleUrl: './artist-login-modal.css',
})
export class ArtistLoginModal {
  constructor(public modal: ModalService) {}

  openLogin() {
    this.modal.openModal('artistLogin');
  }
}
