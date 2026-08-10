import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { ModalService } from '../../../services/modal.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pin-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pin-card.html',
  styleUrl: './pin-card.css',
})
export class PinCard {
  @Input() post!: Post;

  constructor(public modal: ModalService) {}
}
