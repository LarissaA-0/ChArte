import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-perfil-menu',
  standalone: true,
  templateUrl: './perfil-menu.html',
  styleUrl: './perfil-menu.css',
})
export class PerfilMenuComponent {
  @Output() abaSelecionada = new EventEmitter<string>();

  selecionarAba(aba: string): void {
    this.abaSelecionada.emit(aba);
  }
}
