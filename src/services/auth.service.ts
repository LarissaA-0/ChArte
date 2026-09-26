import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioTeste = {
    idUsuario: '7f8c2e91-4a3b-4d00-0000-000000000001',
    nomeUsuario: 'muzzle',
    senha: '123456',
  };

  login(nomeUsuario: string, senha: string): boolean {
    if (nomeUsuario === this.usuarioTeste.nomeUsuario && senha === this.usuarioTeste.senha) {
      localStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioTeste));

      return true;
    }

    return false;
  }

  getUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');

    return usuario ? JSON.parse(usuario) : null;
  }

  estaLogado(): boolean {
    return localStorage.getItem('usuarioLogado') !== null;
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
  }
}
