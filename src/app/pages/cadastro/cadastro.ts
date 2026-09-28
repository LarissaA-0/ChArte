import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TipoUsuario } from '../../mocks/usuarios.mock';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  nome = '';
  nomeArtistico = '';
  nomeUsuario = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  tipoUsuario: TipoUsuario = 'Comum';
  erro = '';

  constructor(private auth: AuthService, private router: Router) {}

  async criarConta(): Promise<void> {
    this.erro = '';
    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não conferem.';
      return;
    }
    const sessao = await this.auth.registrar({
      nome: this.nome,
      nomeArtistico: this.nomeArtistico,
      nomeUsuario: this.nomeUsuario,
      email: this.email,
      senha: this.senha,
      tipoUsuario: this.tipoUsuario,
    });
    if (!sessao) {
      this.erro = 'Não foi possível criar a conta. Verifique os dados e se o e-mail ou usuário já estão cadastrados.';
      return;
    }
    void this.router.navigate(sessao.tipoUsuario === 'Artista' ? ['/artista'] : ['/perfil', sessao.nomeUsuario]);
  }
}
