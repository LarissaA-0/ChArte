import { Component, OnInit } from '@angular/core';
import { ArtistArea } from '../artist-area/artist-area';
import { AuthService } from '../../../../services/auth.service';
import { PerfilService } from '../../../../services/perfil.service';
import { PinService } from '../../../../services/pinService';
import { PerfilView } from '../../../models/perfil';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-artist-area-page',
  standalone: true,
  imports: [ArtistArea],
  template: `
    @if (perfil) {
      <app-artist-area [perfil]="perfil" [artes]="artes" (perfilAtualizado)="atualizarPerfil($event)" />
    } @else {
      <main class="artist-area-loading"><p>Carregando área do artista…</p></main>
    }
  `,
  styles: [`.artist-area-loading { min-height: 100vh; display: grid; place-items: center; color: #fff; background: #141116; }`],
})
export class ArtistAreaPage implements OnInit {
  perfil: PerfilView | null = null;
  artes: Post[] = [];

  constructor(
    private auth: AuthService,
    private perfis: PerfilService,
    private pins: PinService,
  ) {}

  ngOnInit(): void {
    const usuario = this.auth.getUsuarioLogado();
    if (!usuario) return;
    this.perfis.getPerfil(usuario.nomeUsuario).subscribe((perfil) => {
      this.perfil = perfil;
      this.artes = perfil ? this.pins.getArtesPorArtista(perfil.nomeUsuario) : [];
    });
  }

  atualizarPerfil(perfil: PerfilView): void {
    this.perfil = perfil;
    this.artes = this.pins.getArtesPorArtista(perfil.nomeUsuario);
  }
}
