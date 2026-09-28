import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sub-menu',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './sub-menu.html',
  styleUrl: './sub-menu.css',
})
export class SubMenu {
  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private router: Router,
  ) {}

  openMenu() {
    this.modal.openModal('subMenu');
  }

  irParaMeuPerfil(): void {
    const usuario = this.auth.getUsuarioLogado();
    this.modal.closeModal();

    if (usuario) {
      this.router.navigate(['/perfil', usuario.nomeUsuario]);
    } else {
      this.modal.openModal('login');
    }
  }

  logout(): void {
    this.auth.logout();
    this.modal.closeModal();
    void this.router.navigate(['/']);
  }
}
