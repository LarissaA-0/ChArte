import { Component, Input, Output } from '@angular/core';
import { Post } from '../../models/post';
import { ModalService } from '../../../services/modal.service';
import { RouterLink } from '@angular/router';
import { PinService } from '../../../services/pinService';

@Component({
  selector: 'app-pin-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pin-card.html',
  styleUrl: './pin-card.css',
})
export class PinCard {
  @Input() post!: Post;

  @Input() portfolio: string = '';
  @Input() titulo: string = '';
  @Input() nomeArtistico: string = '';
  @Input() fotoPerfil: string = '';

  constructor(
    public modal: ModalService,
    private pinService: PinService,
  ) {}

  abrirPinModal() {
    this.modal.selecionarPost(this.post);
    this.modal.openModal('pinModal');
  }
}
