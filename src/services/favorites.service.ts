import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../app/models/post';
import { PinService } from './pinService';

const STORAGE_FAVORITOS = 'charte:favoritos:v1';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly idsSubject = new BehaviorSubject<number[]>(this.carregarIds());
  readonly ids$ = this.idsSubject.asObservable();

  constructor(private pins: PinService) {}

  private carregarIds(): number[] {
    try {
      const dados = JSON.parse(localStorage.getItem(STORAGE_FAVORITOS) ?? '[]') as unknown;
      return Array.isArray(dados) ? dados.filter((id): id is number => Number.isInteger(id)) : [];
    } catch { return []; }
  }

  private persistir(): void {
    try { localStorage.setItem(STORAGE_FAVORITOS, JSON.stringify(this.idsSubject.value)); } catch { /* Disponível durante a sessão se o storage estiver bloqueado. */ }
  }

  listar(): Post[] {
    const ids = new Set(this.idsSubject.value);
    return this.pins.getArtes().filter((arte) => ids.has(arte.id));
  }

  contem(id: number): boolean { return this.idsSubject.value.includes(id); }

  alternar(id: number): void {
    const ids = this.contem(id) ? this.idsSubject.value.filter((atual) => atual !== id) : [...this.idsSubject.value, id];
    this.idsSubject.next(ids);
    this.persistir();
  }
}
