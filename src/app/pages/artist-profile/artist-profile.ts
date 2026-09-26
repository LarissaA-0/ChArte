import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PinCardModal } from '../../components/pin-card-modal/pin-card-modal';
import { PinCard } from '../../components/pin-card/pin-card';
import { PinService } from '../../../services/pinService';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Sidebar } from '../../components/profile/sidebar/sidebar';
import { Banner } from '../../components/banner/banner';
import { UserLoginModal } from '../../components/user-login-modal/user-login-modal';
import { SubMenu } from '../../components/sub-menu/sub-menu';
import { ArtistLoginModal } from '../../components/artist-login-modal/artist-login-modal';
import { ModalService } from '../../../services/modal.service';
import { Colecao } from '../../components/profile/colecao/colecao';
import { Comissoes } from '../../components/profile/comissoes/comissoes';
import { Portfolio } from '../../components/profile/portfolio/portfolio';
import { PerfilMenuComponent } from '../../components/profile/perfil-menu/perfil-menu';
import { PostButton } from '../../components/profile/post-button/post-button';
import { PostModal } from '../../components/post-modal/post-modal';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerfilService } from '../../../services/perfil.service';
import { PerfilView } from '../../models/perfil';

@Component({
  selector: 'app-artist-profile',
  imports: [
    SearchBar,
    PinCard,
    PinCardModal,
    Sidebar,
    Banner,
    SubMenu,
    UserLoginModal,
    ArtistLoginModal,
    Colecao,
    Comissoes,
    Portfolio,
    PerfilMenuComponent,
    PostButton,
    PostModal,
    AsyncPipe,
  ],
  templateUrl: './artist-profile.html',
  styleUrl: './artist-profile.css',
})
export class ArtistProfile {
  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private perfilService: PerfilService,
  ) {}
  perfil?: PerfilView;
  abaAtual = 'colecao';

  selecionarAba(aba: string): void {
    this.abaAtual = aba;
  }
  ngOnInit(): void {
    const nomeUsuario = this.route.snapshot.paramMap.get('nomeUsuario');

    if (nomeUsuario) {
      this.perfilService.getPerfil(nomeUsuario).subscribe((perfil) => {
        this.perfil = perfil;
      });
    }
  }
}
