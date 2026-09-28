import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-menu',
  standalone: true,
  templateUrl: './perfil-menu.html',
  styleUrl: './perfil-menu.css',
})
export class PerfilMenuComponent {
  @Input() mostrarAreaArtista: boolean = false;
  @Input() abaAtiva: string = 'portfolio';
  @Output() abaSelecionada = new EventEmitter<string>();

  constructor(private router: Router) {}

  selecionarAba(aba: string): void {
    if (aba === 'artista') {
      void this.router.navigate(['/artista']);
      this.abaSelecionada.emit(aba);
      return;
    }
    this.abaAtiva = aba;
    this.abaSelecionada.emit(aba);
  }
}
