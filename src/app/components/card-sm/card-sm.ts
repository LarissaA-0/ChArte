import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-sm',
  standalone: true,
  imports: [],
  templateUrl: './card-sm.html',
  styleUrl: './card-sm.css',
})
export class CardSm {
  @Input() imagem!: string;
  @Input() estilo!: string;
  @Input() link!: string;
}
