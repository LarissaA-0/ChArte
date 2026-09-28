import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../app/models/post';
import { MOCK_ARTES } from '../app/mocks/artes.mock';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  artes: Post[] = [...MOCK_ARTES];

  //pega todas as artes
  getArtes(): Post[] {
    return this.artes;
  }

  //pega artes por categoria
  buscarPorCategoria(categoria: string): Observable<Post[]> {
    return of(this.artes.filter((arte) => arte.categoria.nomeCategoria.toLowerCase() === categoria.trim().toLowerCase()));
  }

  //pega artes de um artista em especifico por artistaId
  getArtist(artistaId: number): Post[] {
    return this.artes.filter((arte) => arte.usuario.artistaId === artistaId);
  }

  //pega artes de um artista pelo nomeUsuario
  getArtesPorArtista(nomeUsuario: string): Post[] {
    return this.artes.filter(
      (arte) => arte.usuario.nomeUsuario?.toLowerCase() === nomeUsuario.trim().toLowerCase(),
    );
  }

  adicionarArte(dados: { titulo: string; descricao: string; portfolio: string; categoria: string; estilo: string; preco: number }, perfil: import('../app/models/perfil').PerfilView): Post {
    const arte: Post = {
      id: Math.max(0, ...this.artes.map((item) => item.id)) + 1,
      titulo: dados.titulo, descricao: dados.descricao, portfolio: dados.portfolio,
      nomeArtistico: perfil.nomeArtistico || perfil.nome, preco: dados.preco, estilo: dados.estilo,
      usuario: { id: Number(perfil.idUsuario.slice(-2)) || 1, artistaId: perfil.idArtista || 0, nomeUsuario: perfil.nomeUsuario, nomeArtistico: perfil.nomeArtistico || perfil.nome, fotoPerfil: perfil.fotoPerfil },
      categoria: { id: 0, nomeCategoria: dados.categoria },
    };
    this.artes = [...this.artes, arte];
    return { ...arte };
  }

  atualizarArte(arte: Post): void {
    this.artes = this.artes.map((item) => item.id === arte.id ? { ...arte } : item);
  }

  excluirArte(id: number): void {
    this.artes = this.artes.filter((item) => item.id !== id);
  }
}
