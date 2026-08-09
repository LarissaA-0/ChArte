import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { ModalService } from '../../../services/modal.service';
@Component({
  selector: 'app-pin-card',
  standalone: true,
  imports: [],
  templateUrl: './pin-card.html',
  styleUrl: './pin-card.css',
})
export class PinCard {
  @Input() post!: Post;

  constructor(public modal: ModalService) {}
}
