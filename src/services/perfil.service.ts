import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PerfilView } from '../app/models/perfil';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private perfil: PerfilView = {
    idUsuario: '7f8c2e91-4a3b-4d00-0000-000000000001',

    nomeUsuario: 'muzzle',

    nome: 'Larissa',

    nomeArtistico: 'Muzzle',

    fotoPerfil: 'assets/imagens/perfil.jpg',

    banner: 'assets/imagens/banner.jpg',

    bio: 'Artista digital',

    tipoUsuario: 'Artista',

    seguidores: 120,

    seguindo: 80,

    avaliacaoMedia: 4.8,

    totalReviews: 15,

    idArtista: 1,
  };

  getPerfil(nomeUsuario: string): Observable<PerfilView> {
    return of(this.perfil);
  }
}
