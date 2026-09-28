import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { PerfilView } from '../app/models/perfil';
import { MOCK_PERFIS } from '../app/mocks/perfis.mock';

const STORAGE_KEY = 'charte:perfis:v1';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private perfis: PerfilView[] = this.carregarPerfis();
  private perfisSubject = new BehaviorSubject<PerfilView[]>(this.perfis);

  private carregarPerfis(): PerfilView[] {
    try {
      const dadosSalvos = localStorage.getItem(STORAGE_KEY);
      const extras = dadosSalvos ? JSON.parse(dadosSalvos) as PerfilView[] : [];
      if (!Array.isArray(extras)) return [...MOCK_PERFIS];
      return [...MOCK_PERFIS, ...extras.filter((extra) => !MOCK_PERFIS.some((perfil) => perfil.nomeUsuario.toLowerCase() === extra.nomeUsuario.toLowerCase()))];
    } catch { return [...MOCK_PERFIS]; }
  }

  private persistirPerfis(): void {
    try {
      const novosPerfis = this.perfis.filter((perfil) => !MOCK_PERFIS.some((mock) => mock.idUsuario === perfil.idUsuario));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novosPerfis));
    } catch { /* Perfis criados continuam disponíveis na sessão atual. */ }
  }

  getPerfil(nomeUsuario: string): Observable<PerfilView | null> {
    const perfil = this.perfis.find((p) => p.nomeUsuario.toLowerCase() === nomeUsuario.trim().toLowerCase());
    return of(perfil ? { ...perfil } : null);
  }

  criarPerfil(dados: { idUsuario: string; nomeUsuario: string; nome: string; nomeArtistico?: string; email: string; tipoUsuario: 'Comum' | 'Artista' }): PerfilView | null {
    if (!this.nomeUsuarioDisponivel(dados.nomeUsuario)) return null;
    const perfil: PerfilView = {
      idUsuario: dados.idUsuario,
      nomeUsuario: dados.nomeUsuario,
      nome: dados.nome,
      nomeArtistico: dados.tipoUsuario === 'Artista' ? (dados.nomeArtistico?.trim() || dados.nome) : undefined,
      fotoPerfil: '/gato.jpeg',
      banner: '/nimona.jpeg',
      bio: '',
      tipoUsuario: dados.tipoUsuario,
      seguidores: 0,
      seguindo: 0,
      avaliacaoMedia: 0,
      totalReviews: 0,
      idArtista: dados.tipoUsuario === 'Artista' ? Math.max(0, ...this.perfis.map((item) => item.idArtista ?? 0)) + 1 : undefined,
      redesSociais: {},
    };
    this.perfis = [...this.perfis, perfil];
    this.perfisSubject.next(this.perfis);
    this.persistirPerfis();
    return { ...perfil };
  }

  atualizarPerfil(nomeUsuario: string, dadosAtualizados: Partial<PerfilView>): boolean {
    const index = this.perfis.findIndex((p) => p.nomeUsuario.toLowerCase() === nomeUsuario.trim().toLowerCase());
    if (index === -1) return false;
    this.perfis[index] = {
      ...this.perfis[index],
      ...dadosAtualizados,
      redesSociais: { ...this.perfis[index].redesSociais, ...dadosAtualizados.redesSociais },
    };
    this.perfisSubject.next([...this.perfis]);
    this.persistirPerfis();
    return true;
  }

  nomeUsuarioDisponivel(nomeUsuario: string, atual = ''): boolean {
    const nome = nomeUsuario.trim().replace(/^@/, '').toLowerCase();
    return !this.perfis.some((perfil) => perfil.nomeUsuario.toLowerCase() === nome && perfil.nomeUsuario.toLowerCase() !== atual.trim().replace(/^@/, '').toLowerCase());
  }
}
