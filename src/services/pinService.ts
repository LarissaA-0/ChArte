import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../app/models/post';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor(private http: HttpClient) {}

  buscarPorCategoria(categoria: string) {
    return this.http.get<Post[]>(`/api/pins?categoria=${categoria}`);
  }
  /*
  buscarPorArtista(artista: string) {
    return this.http.get<artista[]>(`/api/pins?artista=${artista}`);
  }*/
}
