import { Component, Input, input } from '@angular/core';
import { PerfilView } from '../../models/perfil';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  @Input() perfil!: PerfilView;
}
