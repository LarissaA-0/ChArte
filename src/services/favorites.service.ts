import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../app/models/post';
import { PinService } from './pinService';
import { AuthService } from './auth.service';

const STORAGE_FAVORITOS = 'charte:favoritos:v1';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private usuarioId: string | null = null;
  private readonly idsSubject = new BehaviorSubject<number[]>([]);
  readonly ids$ = this.idsSubject.asObservable();

  constructor(private pins: PinService, private auth: AuthService) {
    this.definirUsuario(this.auth.getUsuarioLogado()?.idUsuario ?? null);
    this.auth.usuarioLogado$.subscribe((usuario) => this.definirUsuario(usuario?.idUsuario ?? null));
  }

  private chaveStorage(usuarioId: string): string {
    return `${STORAGE_FAVORITOS}:${encodeURIComponent(usuarioId)}`;
  }

  private definirUsuario(usuarioId: string | null): void {
    if (this.usuarioId === usuarioId) return;
    this.usuarioId = usuarioId;
    this.idsSubject.next(usuarioId ? this.carregarIds(usuarioId) : []);
  }

  private carregarIds(usuarioId: string): number[] {
    try {
      const dados = JSON.parse(localStorage.getItem(this.chaveStorage(usuarioId)) ?? '[]') as unknown;
      return Array.isArray(dados) ? dados.filter((id): id is number => Number.isInteger(id)) : [];
    } catch { return []; }
  }

  private persistir(): void {
    if (!this.usuarioId) return;
    try { localStorage.setItem(this.chaveStorage(this.usuarioId), JSON.stringify(this.idsSubject.value)); } catch { /* Disponível durante a sessão se o storage estiver bloqueado. */ }
  }

  listar(): Post[] {
    const ids = new Set(this.idsSubject.value);
    return this.pins.getArtes().filter((arte) => ids.has(arte.id));
  }

  contem(id: number): boolean { return this.idsSubject.value.includes(id); }

  alternar(id: number): void {
    if (!this.usuarioId) return;
    const ids = this.contem(id) ? this.idsSubject.value.filter((atual) => atual !== id) : [...this.idsSubject.value, id];
    this.idsSubject.next(ids);
    this.persistir();
  }
}
