import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { AsyncPipe } from '@angular/common';
import { Post } from '../../models/post';

@Component({
  selector: 'app-pin-card-modal',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pin-card-modal.html',
  styleUrl: './pin-card-modal.css',
})
export class PinCardModal {
  @Input() post!: Post;
  constructor(public modal: ModalService) {}

  openPin() {
    this.modal.openModal('pinModal');
  }
}
