import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Post } from '../app/models/post';
import { PinService } from './pinService';
import { AuthService } from './auth.service';
import { supabase } from '../app/core/supabase/supabase.client';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
=======
import { BehaviorSubject } from 'rxjs';
import { Post } from '../app/models/post';
import { PinService } from './pinService';
import { AuthService } from './auth.service';

const STORAGE_FAVORITOS = 'charte:favoritos:v1';
>>>>>>> origin/master

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private usuarioId: string | null = null;
  private readonly idsSubject = new BehaviorSubject<number[]>([]);
  readonly ids$ = this.idsSubject.asObservable();

  constructor(private pins: PinService, private auth: AuthService) {
    this.definirUsuario(this.auth.getUsuarioLogado()?.idUsuario ?? null);
    this.auth.usuarioLogado$.subscribe((usuario) => this.definirUsuario(usuario?.idUsuario ?? null));
  }

<<<<<<< HEAD
  private async carregarIdsDoBanco(usuarioId: string): Promise<number[]> {
    try {
      const { data, error } = await supabase
        .from('favorito')
        .select('id_portifolio')
        .eq('id_usuario', usuarioId);

      if (error) {
        console.error('Erro ao carregar favoritos:', error);
        return [];
      }

      return (data ?? []).map((item: any) => item.id_portifolio);
    } catch {
      return [];
    }
=======
  private chaveStorage(usuarioId: string): string {
    return `${STORAGE_FAVORITOS}:${encodeURIComponent(usuarioId)}`;
>>>>>>> origin/master
  }

  private definirUsuario(usuarioId: string | null): void {
    if (this.usuarioId === usuarioId) return;
    this.usuarioId = usuarioId;
<<<<<<< HEAD
    if (usuarioId) {
      this.carregarIdsDoBanco(usuarioId).then(ids => this.idsSubject.next(ids));
    } else {
      this.idsSubject.next([]);
    }
  }

  listar(): Observable<Post[]> {
    const ids = this.idsSubject.value;
    if (ids.length === 0) {
      return from([[] as Post[]]);
    }
    const idsSet = new Set(ids);
    return this.pins.getArtes().pipe(
      map(artes => artes.filter((arte: Post) => idsSet.has(arte.id)))
    );
  }

  listarIds(): number[] {
    return this.idsSubject.value;
=======
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
>>>>>>> origin/master
  }

  contem(id: number): boolean { return this.idsSubject.value.includes(id); }

<<<<<<< HEAD
  async alternar(id: number): Promise<void> {
    if (!this.usuarioId) return;

    const ids = this.idsSubject.value;
    const isFavorito = ids.includes(id);

    if (isFavorito) {
      // Remover favorito
      const { error } = await supabase
        .from('favorito')
        .delete()
        .eq('id_usuario', this.usuarioId)
        .eq('id_portifolio', id);

      if (error) {
        console.error('Erro ao remover favorito:', error);
        return;
      }

      this.idsSubject.next(ids.filter((atual) => atual !== id));
    } else {
      // Adicionar favorito
      const { error } = await supabase
        .from('favorito')
        .insert({
          id_usuario: this.usuarioId,
          id_portifolio: id,
        });

      if (error) {
        console.error('Erro ao adicionar favorito:', error);
        return;
      }

      this.idsSubject.next([...ids, id]);
    }
  }
}
=======
  alternar(id: number): void {
    if (!this.usuarioId) return;
    const ids = this.contem(id) ? this.idsSubject.value.filter((atual) => atual !== id) : [...this.idsSubject.value, id];
    this.idsSubject.next(ids);
    this.persistir();
  }
}
>>>>>>> origin/master
