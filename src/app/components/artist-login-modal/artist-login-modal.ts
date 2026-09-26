import { Component, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist-login-modal',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './artist-login-modal.html',
  styleUrl: './artist-login-modal.css',
})
export class ArtistLoginModal {
  nomeUsuario = '';
  senha = '';

  constructor(
    public modal: ModalService,
    private authService: AuthService,
    private router: Router,
  ) {}
  entrar(): void {
    const sucesso = this.authService.login(this.nomeUsuario, this.senha);

    if (sucesso) {
      this.router.navigate(['/perfil', this.nomeUsuario]);
    } else {
      alert('Usuário ou senha incorretos');
    }
  }

  openLogin() {
    this.modal.openModal('artistLogin');
  }
}
