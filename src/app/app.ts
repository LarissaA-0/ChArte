import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chat } from './components/chat/chat';
import { UserLoginModal } from './components/user-login-modal/user-login-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Chat, UserLoginModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('charte');

  constructor() {
    const temaSalvo = localStorage.getItem('charte-tema');
    document.documentElement.dataset['theme'] = temaSalvo === 'claro' ? 'claro' : 'escuro';
  }
}
