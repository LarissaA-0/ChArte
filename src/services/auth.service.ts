import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logado = false;

  estaLogado(): boolean {
    return this.logado;
  }

  login() {
    this.logado = true;
  }

  logout() {
    this.logado = false;
  }
}
