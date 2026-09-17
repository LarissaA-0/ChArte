import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../app/models/post';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor(private http: HttpClient) {}

  artes: Post[] = [
    {
      id: 1,
      titulo: 'Batman',
      descricao: '',
      portfolio: 'batman.jpeg',
      nomeArtistico: 'Larissa',
      preco: 12.99,
      usuario: {
        id: 1,
        artistaId: 2,
        nomeArtistico: 'Larissa',
        fotoPerfil: 'batman.jpeg',
      },

      categoria: {
        id: 1,
        nomeCategoria: 'Ilustração',
      },
    },
    {
      id: 2,
      titulo: 'Frieren',
      descricao: 'Fanart da Frieren',
      portfolio: 'frieren.jpeg',
      nomeArtistico: 'Yasmin',
      preco: 0.0,
      usuario: {
        id: 2,
        artistaId: 2,
        nomeArtistico: 'YasArt',
        fotoPerfil: 'frieren.jpeg',
      },

      categoria: {
        id: 2,
        nomeCategoria: 'Fanart',
      },
    },
    {
      id: 3,
      titulo: 'Nimona',
      descricao: 'Ilustração da personagem Nimona',
      portfolio: 'nimona.jpeg',
      nomeArtistico: 'Carol',
      preco: 0.0,

      usuario: {
        id: 3,
        artistaId: 2,
        nomeArtistico: 'CarolArt',
        fotoPerfil: 'nimona.jpeg',
      },

      categoria: {
        id: 1,
        nomeCategoria: 'Ilustração',
      },
    },
  ];
  //pega todas s artes
  getArtes(): Post[] {
    return this.artes;
  }
  //pega artes por categoria
  buscarPorCategoria(categoria: string) {
    return this.http.get<Post[]>(`/api/pins?categoria=${categoria}`);
  }

  //pega artes de um artista em especifico
  getArtist(artistald: number): Post[] {
    return this.artes.filter((arte) => arte.usuario.artistaId === artistald);
  }

  /*
  buscarPorArtista(artista: string) {
    return this.http.get<artista[]>(`/api/pins?artista=${artista}`);
  }*/
}
