import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ArtistAreaService } from '../../../../services/artist-area.service';
import { PerfilView } from '../../../models/perfil';

@Component({
  selector: 'app-comissoes',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './comissoes.html',
  styleUrl: './comissoes.css',
})
export class Comissoes {
  @Input() perfil?: PerfilView;

  constructor(private artistData: ArtistAreaService, private auth: AuthService) {}

  get comissoesAbertas(): boolean {
    return this.perfil ? this.artistData.obterPrivacidade(this.perfil.nomeUsuario).aceitarComissoes : true;
  }

  get perfilEhDono(): boolean {
    const usuario = this.auth.getUsuarioLogado();
    return !!usuario && !!this.perfil && usuario.nomeUsuario.toLowerCase() === this.perfil.nomeUsuario.toLowerCase();
  }

  get pacotes() { return this.perfil ? this.artistData.listarOpcoesComissao(this.perfil.nomeUsuario) : []; }
  get diretrizes() { return this.perfil ? this.artistData.listarDiretrizes(this.perfil.nomeUsuario) : []; }
}
