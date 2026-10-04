import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SearchBar } from '../../components/search-bar/search-bar';
import { PinCardModal } from '../../components/pin-card-modal/pin-card-modal';
import { PinCard } from '../../components/pin-card/pin-card';
import { SubMenu } from '../../components/sub-menu/sub-menu';
import { ArtistLoginModal } from '../../components/artist-login-modal/artist-login-modal';
import { ModalService } from '../../../services/modal.service';
import { ArtistAreaService } from '../../../services/artist-area.service';
import { AuthService } from '../../../services/auth.service';
import { FavoritesService } from '../../../services/favorites.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [SearchBar, PinCard, PinCardModal, SubMenu, ArtistLoginModal, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css',
})
export class FavoritesPage implements OnInit {
  aba: 'favoritos' | 'pedidos' = 'favoritos';
  username = '';
  constructor(public modal: ModalService, private route: ActivatedRoute, private router: Router, private artistData: ArtistAreaService, private auth: AuthService, public favorites: FavoritesService) {}
  ngOnInit(): void {
    this.username = this.auth.getUsuarioLogado()?.nomeUsuario ?? '';
    this.route.queryParamMap.subscribe((params) => { if (params.get('aba') === 'pedidos') this.aba = 'pedidos'; });
  }
  get pedidos() { return this.username ? this.artistData.listarPedidosCliente(this.username) : []; }
  get artesFavoritas() { return this.favorites.listar(); }
  selecionarAba(aba: 'favoritos' | 'pedidos'): void { this.aba = aba; void this.router.navigate([], { relativeTo: this.route, queryParams: { aba: aba === 'pedidos' ? 'pedidos' : null }, queryParamsHandling: 'merge' }); }
  statusClasse(status: string): string { return status.toLowerCase().replaceAll(' ', '-'); }
  statusPedido(pedido: import('../../models/artist-area').Comissao): string { return pedido.status === 'Pendente' && pedido.pagamentoStatus === 'pendente' ? 'Aguardando pagamento' : pedido.status === 'Pendente' && pedido.pagamentoStatus === 'falhou' ? 'Pagamento recusado' : pedido.status; }
  abrirPin(arte: import('../../models/post').Post): void { this.modal.selecionarPost(arte); this.modal.openModal('pinModal'); }
}
