<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
import {
  AvaliacaoArtista,
  Comissao,
  DiretrizComissao,
  OpcaoComissao,
  PrivacidadeArtista,
  StatusComissao,
} from '../app/models/artist-area';
import { supabase } from '../app/core/supabase/supabase.client';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

const PRIVACIDADE_PADRAO: PrivacidadeArtista = {
  perfilPublico: true,
  exibirRedesSociais: true,
  exibirInformacoes: true,
  aceitarComissoes: true,
};

const CLONAR_COMISSAO = (item: Comissao): Comissao => ({
  ...item,
  referencias: [...item.referencias],
  cliente: { ...item.cliente },
});

@Injectable({ providedIn: 'root' })
export class ArtistAreaService {
  private readonly comissoesSubject = new BehaviorSubject<Comissao[]>([]);
  readonly comissoes$ = this.comissoesSubject.asObservable();

  /** Retorna o snapshot atual das comissões. */
  obterComissoesAtuais(): Comissao[] {
    return this.comissoesSubject.getValue();
  }

  private readonly catalogoSubject = new BehaviorSubject<{
    opcoes: OpcaoComissao[];
    diretrizes: DiretrizComissao[];
  }>({ opcoes: [], diretrizes: [] });
  readonly catalogo$ = this.catalogoSubject.asObservable();

  private readonly privacidadeSubject = new BehaviorSubject<Map<string, PrivacidadeArtista>>(new Map());
  private readonly avaliacoesSubject = new BehaviorSubject<AvaliacaoArtista[]>([]);

  constructor() {
    this.carregarTudo();
  }

  private async carregarTudo(): Promise<void> {
    await Promise.all([
      this.carregarComissoes(),
      this.carregarCatalogo(),
      this.carregarPrivacidade(),
      this.carregarAvaliacoes(),
    ]);
  }

  // ============================================================================
  // COMISSÕES
  // ============================================================================

  private async carregarComissoes(): Promise<void> {
    const { data, error } = await supabase
      .from('comissao')
      .select(`
        id_comissao,
        id_artista,
        id_cliente,
        titulo,
        descricao,
        referencias,
        valor,
        criada_em,
        prazo,
        status,
        concluida_em,
        observacao_entrega,
        arquivo_entrega,
        pagamento,
        pagamento_status,
        payment_id,
        checkout_url,
        opcao_titulo,
        proposta_valor,
        proposta_prazo,
        artista!inner (
          id_artista,
          nome_artistico,
          id_usuario
        ),
        cliente:usuario!comissao_id_cliente_fkey (
          id_usuario,
          nome_usuario,
          foto_perfil,
          nome
        )
      `);

    if (error) {
      console.error('Erro ao carregar comissões:', error);
      return;
    }

    const comissoes = (data ?? []).map((item: any): Comissao => {
      const artista = Array.isArray(item.artista) ? item.artista[0] : item.artista;
      const cliente = Array.isArray(item.cliente) ? item.cliente[0] : item.cliente;
      return {
        id: item.id_comissao,
        artistaUsername: artista?.nome_artistico ?? '',
        cliente: {
          nome: cliente?.nome ?? '',
          username: cliente?.nome_usuario ?? '',
          foto: cliente?.foto_perfil ?? '/gato.jpeg',
        },
        titulo: item.titulo,
        descricao: item.descricao,
        referencias: item.referencias ?? [],
        valor: Number(item.valor),
        criadaEm: item.criada_em,
        prazo: item.prazo,
        status: item.status,
        concluidaEm: item.concluida_em,
        observacaoEntrega: item.observacao_entrega,
        arquivoEntrega: item.arquivo_entrega,
        pagamento: item.pagamento,
        pagamentoStatus: item.pagamento_status,
        paymentId: item.payment_id,
        checkoutUrl: item.checkout_url,
        opcaoTitulo: item.opcao_titulo,
        propostaValor: item.proposta_valor ? Number(item.proposta_valor) : undefined,
        propostaPrazo: item.proposta_prazo,
      };
    });

    this.comissoesSubject.next(comissoes);
  }

  listarComissoes(username: string): Comissao[] {
    return this.comissoesSubject.value
      .filter((item) => item.artistaUsername.toLowerCase() === username.toLowerCase())
      .map(CLONAR_COMISSAO);
  }

  listarPedidosCliente(username: string): Comissao[] {
    return this.comissoesSubject.value
      .filter((item) => item.cliente.username.toLowerCase() === username.toLowerCase())
      .map(CLONAR_COMISSAO);
=======
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MOCK_AVALIACOES } from '../app/mocks/avaliacoes.mock';
import { AvaliacaoArtista, Comissao, DiretrizComissao, OpcaoComissao, PrivacidadeArtista, StatusComissao } from '../app/models/artist-area';
import { COMMISSION_STORE, CommissionStore } from './commission-store';

const PRIVACIDADE_PADRAO: PrivacidadeArtista = { perfilPublico: true, exibirRedesSociais: true, exibirInformacoes: true, aceitarComissoes: true };
const STORAGE_CATALOGO = 'charte:artist-area:catalogo:v1';
const STORAGE_PRIVACIDADE = 'charte:artist-area:privacidade:v1';

const CLONAR_COMISSAO = (item: Comissao): Comissao => ({ ...item, referencias: [...item.referencias], cliente: { ...item.cliente } });

@Injectable({ providedIn: 'root' })
export class ArtistAreaService {
  private readonly comissoesSubject: BehaviorSubject<Comissao[]>;
  readonly comissoes$: Observable<Comissao[]>;
  private readonly catalogoSubject = new BehaviorSubject<{ opcoes: OpcaoComissao[]; diretrizes: DiretrizComissao[] }>(this.carregarCatalogo());
  readonly catalogo$ = this.catalogoSubject.asObservable();
  private readonly privacidade = this.carregarPrivacidade();
  private readonly avaliacoes = MOCK_AVALIACOES.map((item) => ({ ...item }));

  constructor(@Inject(COMMISSION_STORE) private readonly commissionStore: CommissionStore) {
    this.comissoesSubject = new BehaviorSubject<Comissao[]>(commissionStore.load().map(CLONAR_COMISSAO));
    this.comissoes$ = this.comissoesSubject.asObservable();
  }

  private carregarCatalogo(): { opcoes: OpcaoComissao[]; diretrizes: DiretrizComissao[] } {
    try {
      const salvo = localStorage.getItem(STORAGE_CATALOGO);
      if (salvo) {
        const dados = JSON.parse(salvo) as { opcoes: OpcaoComissao[]; diretrizes: DiretrizComissao[] };
        if (Array.isArray(dados.opcoes) && Array.isArray(dados.diretrizes)) return dados;
      }
    } catch { /* Usa os dados iniciais se o armazenamento não puder ser lido. */ }
    return {
      opcoes: [
        { id: 1, artistaUsername: 'muzzle', titulo: 'Sketch / Lineart', descricao: 'Esboço digital limpo ou traço finalizado sem pintura.', precoInicial: 60, prazo: '3 a 5 dias úteis', itens: ['1 personagem', 'Fundo simples ou transparente', '1 rodada de revisão'], destaque: false, ativa: true },
        { id: 2, artistaUsername: 'muzzle', titulo: 'Meio Corpo Colorido', descricao: 'Ilustração com cores sólidas, sombras e iluminação trabalhada.', precoInicial: 130, prazo: '5 a 10 dias úteis', itens: ['1 personagem (busto/cintura)', 'Fundo gradiente ou abstrato', '2 rodadas de revisões'], destaque: true, ativa: true },
        { id: 3, artistaUsername: 'muzzle', titulo: 'Ilustração Completa', descricao: 'Corpo inteiro com cenário detalhado, efeitos de luz e alta resolução.', precoInicial: 260, prazo: '10 a 18 dias úteis', itens: ['Personagem com pose dinâmica', 'Cenário temático completo', 'Arquivos em alta resolução (300 DPI)'], destaque: false, ativa: true },
        { id: 4, artistaUsername: 'yasart', titulo: 'Sketch / Lineart', descricao: 'Esboço digital limpo ou traço finalizado sem pintura.', precoInicial: 60, prazo: '3 a 5 dias úteis', itens: ['1 personagem', 'Fundo simples ou transparente', '1 rodada de revisão'], destaque: false, ativa: true },
        { id: 5, artistaUsername: 'yasart', titulo: 'Meio Corpo Colorido', descricao: 'Ilustração com cores sólidas, sombras e iluminação trabalhada.', precoInicial: 130, prazo: '5 a 10 dias úteis', itens: ['1 personagem (busto/cintura)', 'Fundo gradiente ou abstrato', '2 rodadas de revisões'], destaque: true, ativa: true },
        { id: 6, artistaUsername: 'yasart', titulo: 'Ilustração Completa', descricao: 'Corpo inteiro com cenário detalhado, efeitos de luz e alta resolução.', precoInicial: 260, prazo: '10 a 18 dias úteis', itens: ['Personagem com pose dinâmica', 'Cenário temático completo', 'Arquivos em alta resolução (300 DPI)'], destaque: false, ativa: true },
      ],
      diretrizes: [
        { id: 1, artistaUsername: 'muzzle', titulo: 'Briefing e referências', descricao: 'Envie referências visuais de poses, personagens e paleta de cores para orientar a produção.' },
        { id: 2, artistaUsername: 'muzzle', titulo: 'Aprovação do esboço', descricao: 'O artista enviará um esboço inicial para confirmação de pose e composição antes da finalização.' },
        { id: 3, artistaUsername: 'muzzle', titulo: 'Entrega digital', descricao: 'Envio da arte finalizada em alta definição nos formatos PNG/JPEG por download direto.' },
        { id: 4, artistaUsername: 'yasart', titulo: 'Briefing e referências', descricao: 'Envie referências visuais de poses, personagens e paleta de cores para orientar a produção.' },
        { id: 5, artistaUsername: 'yasart', titulo: 'Aprovação do esboço', descricao: 'O artista enviará um esboço inicial para confirmação de pose e composição antes da finalização.' },
        { id: 6, artistaUsername: 'yasart', titulo: 'Entrega digital', descricao: 'Envio da arte finalizada em alta definição nos formatos PNG/JPEG por download direto.' },
      ],
    };
  }

  private carregarPrivacidade(): Map<string, PrivacidadeArtista> {
    try {
      const salvo = localStorage.getItem(STORAGE_PRIVACIDADE);
      const dados = salvo ? JSON.parse(salvo) as Record<string, PrivacidadeArtista> : {};
      return new Map(Object.entries(dados));
    } catch { return new Map(); }
  }

  private salvarComissoes(): void { this.commissionStore.save(this.comissoesSubject.value); }
  private salvarCatalogo(): void { try { localStorage.setItem(STORAGE_CATALOGO, JSON.stringify(this.catalogoSubject.value)); } catch { /* O repositório remoto poderá persistir quando estiver configurado. */ } }
  private salvarPrivacidadeMap(): void { try { localStorage.setItem(STORAGE_PRIVACIDADE, JSON.stringify(Object.fromEntries(this.privacidade))); } catch { /* O repositório remoto poderá persistir quando estiver configurado. */ } }

  listarComissoes(username: string): Comissao[] {
    return this.comissoesSubject.value.filter((item) => item.artistaUsername.toLowerCase() === username.toLowerCase()).map(CLONAR_COMISSAO);
  }

  listarPedidosCliente(username: string): Comissao[] {
    return this.comissoesSubject.value.filter((item) => item.cliente.username.toLowerCase() === username.toLowerCase()).map(CLONAR_COMISSAO);
>>>>>>> origin/master
  }

  obterComissao(id: number): Comissao | undefined {
    const item = this.comissoesSubject.value.find((comissao) => comissao.id === id);
    return item ? CLONAR_COMISSAO(item) : undefined;
  }

<<<<<<< HEAD
  async solicitarComissao(dados: Omit<Comissao, 'id' | 'status' | 'criadaEm'>): Promise<Comissao | null> {
    const { data: artistaData } = await supabase
      .from('artista')
      .select('id_artista')
      .eq('nome_artistico', dados.artistaUsername)
      .single();

    const { data: clienteData } = await supabase
      .from('usuario')
      .select('id_usuario')
      .eq('nome_usuario', dados.cliente.username)
      .single();

    if (!artistaData || !clienteData) return null;

    const { data, error } = await supabase
      .from('comissao')
      .insert({
        id_artista: artistaData.id_artista,
        id_cliente: clienteData.id_usuario,
        titulo: dados.titulo,
        descricao: dados.descricao,
        referencias: dados.referencias,
        valor: dados.valor,
        prazo: dados.prazo,
        status: 'Solicitada',
        opcao_titulo: dados.opcaoTitulo,
      })
      .select(`
        id_comissao,
        id_artista,
        id_cliente,
        titulo,
        descricao,
        referencias,
        valor,
        criada_em,
        prazo,
        status,
        concluida_em,
        observacao_entrega,
        arquivo_entrega,
        pagamento,
        pagamento_status,
        payment_id,
        checkout_url,
        opcao_titulo,
        proposta_valor,
        proposta_prazo,
        artista (
          id_artista,
          nome_artistico,
          id_usuario
        ),
        cliente:usuario!comissao_id_cliente_fkey (
          id_usuario,
          nome_usuario,
          foto_perfil,
          nome
        )
      `)
      .single();

    if (error || !data) {
      console.error('Erro ao solicitar comissão:', error);
      return null;
    }

    const artista = Array.isArray(data.artista) ? (data.artista as any[])[0] : data.artista as any;
      const cliente = Array.isArray(data.cliente) ? (data.cliente as any[])[0] : data.cliente as any;
      const novaComissao: Comissao = {
        id: data.id_comissao,
        artistaUsername: artista?.nome_artistico ?? '',
        cliente: {
          nome: cliente?.nome ?? '',
          username: cliente?.nome_usuario ?? '',
          foto: cliente?.foto_perfil ?? '/gato.jpeg',
        },
        titulo: data.titulo,
        descricao: data.descricao,
        referencias: data.referencias ?? [],
        valor: Number(data.valor),
        criadaEm: data.criada_em,
        prazo: data.prazo,
        status: data.status,
        concluidaEm: data.concluida_em,
        observacaoEntrega: data.observacao_entrega,
        arquivoEntrega: data.arquivo_entrega,
        pagamento: data.pagamento,
        pagamentoStatus: data.pagamento_status,
        paymentId: data.payment_id,
        checkoutUrl: data.checkout_url,
        opcaoTitulo: data.opcao_titulo,
        propostaValor: data.proposta_valor ? Number(data.proposta_valor) : undefined,
        propostaPrazo: data.proposta_prazo,
      };

    this.comissoesSubject.next([...this.comissoesSubject.value, CLONAR_COMISSAO(novaComissao)]);
    return CLONAR_COMISSAO(novaComissao);
  }

  async atualizarStatus(id: number, status: StatusComissao): Promise<void> {
    const { error } = await supabase
      .from('comissao')
      .update({ status, concluida_em: status === 'Finalizada' ? new Date().toISOString() : null })
      .eq('id_comissao', id);

    if (error) {
      console.error('Erro ao atualizar status:', error);
      return;
    }

    await this.carregarComissoes();
  }

  async vincularCheckout(
    id: number,
    paymentId: string,
    checkoutUrl: string,
    status: 'pendente' | 'pago' | 'falhou',
    metodo: 'pix' | 'card' | 'transfer',
  ): Promise<void> {
    const pagamento = metodo === 'pix' ? 'Pix' : metodo === 'card' ? 'Cartão' : 'Transferência';
    const { error } = await supabase
      .from('comissao')
      .update({ payment_id: paymentId, checkout_url: checkoutUrl, pagamento: pagamento, pagamento_status: status })
      .eq('id_comissao', id)
      .eq('status', 'Pendente');

    if (error) {
      console.error('Erro ao vincular checkout:', error);
      return;
    }

    await this.carregarComissoes();
  }

  async atualizarPagamento(id: number, status: 'pendente' | 'pago' | 'falhou'): Promise<void> {
    const { error } = await supabase
      .from('comissao')
      .update({ pagamento_status: status })
      .eq('id_comissao', id)
      .eq('status', 'Pendente');

    if (error) {
      console.error('Erro ao atualizar pagamento:', error);
      return;
    }

    await this.carregarComissoes();
  }

  async enviarProposta(id: number, valor: number, prazo: string): Promise<void> {
    if (!Number.isFinite(valor) || valor <= 0 || !prazo.trim()) return;
    const { error } = await supabase
      .from('comissao')
      .update({
        status: 'Aguardando aprovação do cliente',
        proposta_valor: valor,
        proposta_prazo: prazo.trim(),
      })
      .eq('id_comissao', id)
      .eq('status', 'Solicitada');

    if (error) {
      console.error('Erro ao enviar proposta:', error);
      return;
    }

    await this.carregarComissoes();
  }

  async registrarEntrega(id: number, arquivoEntrega: string, observacaoEntrega: string): Promise<void> {
    const { error } = await supabase
      .from('comissao')
      .update({
        arquivo_entrega: arquivoEntrega,
        observacao_entrega: observacaoEntrega,
        status: 'Entregue',
      })
      .eq('id_comissao', id)
      .eq('pagamento_status', 'pago')
      .eq('status', 'Em andamento');

    if (error) {
      console.error('Erro ao registrar entrega:', error);
      return;
    }

    await this.carregarComissoes();
  }

  // ============================================================================
  // CATÁLOGO (OPÇÕES E DIRETRIZES)
  // ============================================================================

  private async carregarCatalogo(): Promise<void> {
    const { data: opcoes } = await supabase
      .from('opcao_comissao')
      .select(`
        id_opcao,
        id_artista,
        titulo,
        descricao,
        preco_inicial,
        prazo,
        itens,
        destaque,
        ativa,
        artista (
          id_artista,
          nome_artistico
        )
      `);

    const { data: diretrizes } = await supabase
      .from('diretriz_comissao')
      .select(`
        id_diretriz,
        id_artista,
        titulo,
        descricao,
        artista (
          id_artista,
          nome_artistico
        )
      `);

    const opcoesMapeadas: OpcaoComissao[] = (opcoes ?? []).map((item: any): OpcaoComissao => ({
      id: item.id_opcao,
      artistaUsername: item.artista?.nome_artistico ?? '',
      titulo: item.titulo,
      descricao: item.descricao,
      precoInicial: Number(item.preco_inicial),
      prazo: item.prazo,
      itens: item.itens ?? [],
      destaque: item.destaque,
      ativa: item.ativa,
    }));

    const diretrizesMapeadas: DiretrizComissao[] = (diretrizes ?? []).map((item: any): DiretrizComissao => ({
      id: item.id_diretriz,
      artistaUsername: item.artista?.nome_artistico ?? '',
      titulo: item.titulo,
      descricao: item.descricao,
    }));

    this.catalogoSubject.next({ opcoes: opcoesMapeadas, diretrizes: diretrizesMapeadas });
  }

  listarOpcoesComissao(username: string, incluirInativas = false): OpcaoComissao[] {
    return this.catalogoSubject.value.opcoes
      .filter(
        (item) =>
          item.artistaUsername.toLowerCase() === username.toLowerCase() &&
          (incluirInativas || item.ativa),
      )
      .map((item) => ({ ...item, itens: [...item.itens] }));
  }

  async salvarOpcaoComissao(opcao: Omit<OpcaoComissao, 'id'> & { id?: number }): Promise<OpcaoComissao | null> {
    const { data: artistaData } = await supabase
      .from('artista')
      .select('id_artista')
      .eq('nome_artistico', opcao.artistaUsername)
      .single();

    if (!artistaData) return null;

    if (opcao.id) {
      const { error } = await supabase
        .from('opcao_comissao')
        .update({
          titulo: opcao.titulo,
          descricao: opcao.descricao,
          preco_inicial: opcao.precoInicial,
          prazo: opcao.prazo,
          itens: opcao.itens,
          destaque: opcao.destaque,
          ativa: opcao.ativa,
        })
        .eq('id_opcao', opcao.id)
        .eq('id_artista', artistaData.id_artista);

      if (error) {
        console.error('Erro ao atualizar opção:', error);
        return null;
      }
    } else {
      const { data, error } = await supabase
        .from('opcao_comissao')
        .insert({
          id_artista: artistaData.id_artista,
          titulo: opcao.titulo,
          descricao: opcao.descricao,
          preco_inicial: opcao.precoInicial,
          prazo: opcao.prazo,
          itens: opcao.itens,
          destaque: opcao.destaque,
          ativa: opcao.ativa,
        })
        .select('id_opcao')
        .single();

      if (error || !data) {
        console.error('Erro ao criar opção:', error);
        return null;
      }
      opcao.id = data.id_opcao;
    }

    await this.carregarCatalogo();
    return { ...opcao, itens: [...opcao.itens] } as OpcaoComissao;
  }

  async excluirOpcaoComissao(id: number, username: string): Promise<void> {
    const { data: artistaData } = await supabase
      .from('artista')
      .select('id_artista')
      .eq('nome_artistico', username)
      .single();

    if (!artistaData) return;

    const { error } = await supabase
      .from('opcao_comissao')
      .delete()
      .eq('id_opcao', id)
      .eq('id_artista', artistaData.id_artista);

    if (error) {
      console.error('Erro ao excluir opção:', error);
      return;
    }

    await this.carregarCatalogo();
  }

  listarDiretrizes(username: string): DiretrizComissao[] {
    return this.catalogoSubject.value.diretrizes
      .filter((item) => item.artistaUsername.toLowerCase() === username.toLowerCase())
      .map((item) => ({ ...item }));
  }

  async salvarDiretriz(diretriz: Omit<DiretrizComissao, 'id'> & { id?: number }): Promise<DiretrizComissao | null> {
    const { data: artistaData } = await supabase
      .from('artista')
      .select('id_artista')
      .eq('nome_artistico', diretriz.artistaUsername)
      .single();

    if (!artistaData) return null;

    if (diretriz.id) {
      const { error } = await supabase
        .from('diretriz_comissao')
        .update({
          titulo: diretriz.titulo,
          descricao: diretriz.descricao,
        })
        .eq('id_diretriz', diretriz.id)
        .eq('id_artista', artistaData.id_artista);

      if (error) {
        console.error('Erro ao atualizar diretriz:', error);
        return null;
      }
    } else {
      const { data, error } = await supabase
        .from('diretriz_comissao')
        .insert({
          id_artista: artistaData.id_artista,
          titulo: diretriz.titulo,
          descricao: diretriz.descricao,
        })
        .select('id_diretriz')
        .single();

      if (error || !data) {
        console.error('Erro ao criar diretriz:', error);
        return null;
      }
      diretriz.id = data.id_diretriz;
    }

    await this.carregarCatalogo();
    return { ...diretriz } as DiretrizComissao;
  }

  async excluirDiretriz(id: number, username: string): Promise<void> {
    const { data: artistaData } = await supabase
      .from('artista')
      .select('id_artista')
      .eq('nome_artistico', username)
      .single();

    if (!artistaData) return;

    const { error } = await supabase
      .from('diretriz_comissao')
      .delete()
      .eq('id_diretriz', id)
      .eq('id_artista', artistaData.id_artista);

    if (error) {
      console.error('Erro ao excluir diretriz:', error);
      return;
    }

    await this.carregarCatalogo();
  }

  // ============================================================================
  // AVALIAÇÕES
  // ============================================================================

  private async carregarAvaliacoes(): Promise<void> {
    const { data, error } = await supabase
      .from('avaliacao_artista')
      .select(`
        id_avaliacao,
        id_artista,
        id_cliente,
        nota,
        comentario,
        data,
        artista (
          id_artista,
          nome_artistico
        ),
        cliente:usuario!avaliacao_artista_id_cliente_fkey (
          id_usuario,
          nome_usuario
        )
      `);

    if (error) {
      console.error('Erro ao carregar avaliações:', error);
      return;
    }

    const avaliacoes: AvaliacaoArtista[] = (data ?? []).map((item: any): AvaliacaoArtista => ({
      id: item.id_avaliacao,
      artistaUsername: item.artista?.nome_artistico ?? '',
      cliente: item.cliente?.nome_usuario ?? '',
      nota: item.nota,
      comentario: item.comentario,
      data: item.data,
    }));

    this.avaliacoesSubject.next(avaliacoes);
  }

  listarAvaliacoes(username: string): AvaliacaoArtista[] {
    return this.avaliacoesSubject.value
      .filter((item) => item.artistaUsername === username)
      .map((item) => ({ ...item }));
  }

  // ============================================================================
  // UTILITÁRIOS
  // ============================================================================

  renomearArtista(usernameAntigo: string, usernameNovo: string): void {
    this.comissoesSubject.next(
      this.comissoesSubject.value.map((item) =>
        item.artistaUsername === usernameAntigo ? { ...item, artistaUsername: usernameNovo } : item,
      ),
    );

    const avaliacoes = this.avaliacoesSubject.value.map((avaliacao) =>
      avaliacao.artistaUsername === usernameAntigo ? { ...avaliacao, artistaUsername: usernameNovo } : avaliacao,
    );
    this.avaliacoesSubject.next(avaliacoes);

    const catalogo = this.catalogoSubject.value;
    this.catalogoSubject.next({
      opcoes: catalogo.opcoes.map((item) =>
        item.artistaUsername === usernameAntigo ? { ...item, artistaUsername: usernameNovo } : item,
      ),
      diretrizes: catalogo.diretrizes.map((item) =>
        item.artistaUsername === usernameAntigo ? { ...item, artistaUsername: usernameNovo } : item,
      ),
    });

    const privacidade = this.privacidadeSubject.value;
    const preferencia = privacidade.get(usernameAntigo);
    if (preferencia) {
      const novaPrivacidade = new Map(privacidade);
      novaPrivacidade.set(usernameNovo, preferencia);
      novaPrivacidade.delete(usernameAntigo);
      this.privacidadeSubject.next(novaPrivacidade);
    }
  }

  // ============================================================================
  // PRIVACIDADE
  // ============================================================================

  private async carregarPrivacidade(): Promise<void> {
    const { data, error } = await supabase
      .from('privacidade_artista')
      .select(`
        id_usuario,
        perfil_publico,
        exibir_redes_sociais,
        exibir_informacoes,
        aceitar_comissoes,
        usuario (
          id_usuario,
          nome_usuario
        )
      `);

    if (error) {
      console.error('Erro ao carregar privacidade:', error);
      return;
    }

    const mapa = new Map<string, PrivacidadeArtista>();
    (data ?? []).forEach((item: any) => {
      if (item.usuario?.nome_usuario) {
        mapa.set(item.usuario.nome_usuario, {
          perfilPublico: item.perfil_publico,
          exibirRedesSociais: item.exibir_redes_sociais,
          exibirInformacoes: item.exibir_informacoes,
          aceitarComissoes: item.aceitar_comissoes,
        });
      }
    });
    this.privacidadeSubject.next(mapa);
  }

  obterPrivacidade(username: string): PrivacidadeArtista {
    return { ...(this.privacidadeSubject.value.get(username) ?? PRIVACIDADE_PADRAO) };
  }

  async salvarPrivacidade(username: string, dados: PrivacidadeArtista): Promise<void> {
    const { data: usuarioData } = await supabase
      .from('usuario')
      .select('id_usuario')
      .eq('nome_usuario', username)
      .single();

    if (!usuarioData) return;

    const { data: artistaData } = await supabase
      .from('artista')
      .select('id_artista')
      .eq('id_usuario', usuarioData.id_usuario)
      .single();

    if (!artistaData) return;

    const { error } = await supabase
      .from('privacidade_artista')
      .upsert({
        id_usuario: usuarioData.id_usuario,
        perfil_publico: dados.perfilPublico,
        exibir_redes_sociais: dados.exibirRedesSociais,
        exibir_informacoes: dados.exibirInformacoes,
        aceitar_comissoes: dados.aceitarComissoes,
      });

    if (error) {
      console.error('Erro ao salvar privacidade:', error);
      return;
    }

    const novaPrivacidade = new Map(this.privacidadeSubject.value);
    novaPrivacidade.set(username, { ...dados });
    this.privacidadeSubject.next(novaPrivacidade);
  }
}
=======
  solicitarComissao(dados: Omit<Comissao, 'id' | 'status' | 'criadaEm'>): Comissao {
    const comissao: Comissao = { ...dados, id: Math.max(0, ...this.comissoesSubject.value.map((item) => item.id)) + 1, criadaEm: new Date().toISOString(), status: 'Solicitada' };
    this.comissoesSubject.next([...this.comissoesSubject.value, CLONAR_COMISSAO(comissao)]);
    this.salvarComissoes();
    return CLONAR_COMISSAO(comissao);
  }

  listarOpcoesComissao(username: string, incluirInativas = false): OpcaoComissao[] {
    return this.catalogoSubject.value.opcoes.filter((item) => item.artistaUsername.toLowerCase() === username.toLowerCase() && (incluirInativas || item.ativa)).map((item) => ({ ...item, itens: [...item.itens] }));
  }

  salvarOpcaoComissao(opcao: Omit<OpcaoComissao, 'id'> & { id?: number }): OpcaoComissao {
    const atuais = this.catalogoSubject.value;
    const id = opcao.id ?? Math.max(0, ...atuais.opcoes.map((item) => item.id)) + 1;
    const salva = { ...opcao, id, itens: [...opcao.itens] } as OpcaoComissao;
    const existe = atuais.opcoes.some((item) => item.id === id && item.artistaUsername.toLowerCase() === salva.artistaUsername.toLowerCase());
    this.catalogoSubject.next({ ...atuais, opcoes: existe ? atuais.opcoes.map((item) => item.id === id && item.artistaUsername.toLowerCase() === salva.artistaUsername.toLowerCase() ? salva : item) : [...atuais.opcoes, salva] });
    this.salvarCatalogo();
    return { ...salva, itens: [...salva.itens] };
  }

  excluirOpcaoComissao(id: number, username: string): void {
    const atuais = this.catalogoSubject.value;
    this.catalogoSubject.next({ ...atuais, opcoes: atuais.opcoes.filter((item) => item.id !== id || item.artistaUsername.toLowerCase() !== username.toLowerCase()) });
    this.salvarCatalogo();
  }

  listarDiretrizes(username: string): DiretrizComissao[] {
    return this.catalogoSubject.value.diretrizes.filter((item) => item.artistaUsername.toLowerCase() === username.toLowerCase()).map((item) => ({ ...item }));
  }

  salvarDiretriz(diretriz: Omit<DiretrizComissao, 'id'> & { id?: number }): DiretrizComissao {
    const atuais = this.catalogoSubject.value;
    const id = diretriz.id ?? Math.max(0, ...atuais.diretrizes.map((item) => item.id)) + 1;
    const salva = { ...diretriz, id } as DiretrizComissao;
    const existe = atuais.diretrizes.some((item) => item.id === id && item.artistaUsername.toLowerCase() === salva.artistaUsername.toLowerCase());
    this.catalogoSubject.next({ ...atuais, diretrizes: existe ? atuais.diretrizes.map((item) => item.id === id && item.artistaUsername.toLowerCase() === salva.artistaUsername.toLowerCase() ? salva : item) : [...atuais.diretrizes, salva] });
    this.salvarCatalogo();
    return { ...salva };
  }

  excluirDiretriz(id: number, username: string): void {
    const atuais = this.catalogoSubject.value;
    this.catalogoSubject.next({ ...atuais, diretrizes: atuais.diretrizes.filter((item) => item.id !== id || item.artistaUsername.toLowerCase() !== username.toLowerCase()) });
    this.salvarCatalogo();
  }

  listarAvaliacoes(username: string): AvaliacaoArtista[] {
    return this.avaliacoes.filter((item) => item.artistaUsername === username).map((item) => ({ ...item }));
  }

  renomearArtista(usernameAntigo: string, usernameNovo: string): void {
    this.comissoesSubject.next(this.comissoesSubject.value.map((item) => item.artistaUsername === usernameAntigo ? { ...item, artistaUsername: usernameNovo } : item));
    this.salvarComissoes();
    for (const avaliacao of this.avaliacoes) if (avaliacao.artistaUsername === usernameAntigo) avaliacao.artistaUsername = usernameNovo;
    const catalogo = this.catalogoSubject.value;
    this.catalogoSubject.next({
      opcoes: catalogo.opcoes.map((item) => item.artistaUsername === usernameAntigo ? { ...item, artistaUsername: usernameNovo } : item),
      diretrizes: catalogo.diretrizes.map((item) => item.artistaUsername === usernameAntigo ? { ...item, artistaUsername: usernameNovo } : item),
    });
    this.salvarCatalogo();
    const preferencia = this.privacidade.get(usernameAntigo);
    if (preferencia) { this.privacidade.set(usernameNovo, preferencia); this.privacidade.delete(usernameAntigo); this.salvarPrivacidadeMap(); }
  }

  atualizarStatus(id: number, status: StatusComissao): void {
    this.comissoesSubject.next(this.comissoesSubject.value.map((item) => {
      if (item.id !== id) return item;
      const permitido: Record<StatusComissao, StatusComissao[]> = {
        'Solicitada': [], 'Aguardando aprovação do cliente': ['Solicitada'], 'Pendente': ['Aguardando aprovação do cliente'],
        'Em andamento': ['Pendente'], 'Entregue': ['Em andamento'], 'Finalizada': ['Entregue'], 'Recusada': ['Solicitada'], 'Cancelada': ['Solicitada', 'Aguardando aprovação do cliente', 'Pendente'],
      };
      if (!permitido[status].includes(item.status)) return item;
      if (status === 'Cancelada' && item.pagamentoStatus === 'pago') return item;
      if ((status === 'Em andamento' || status === 'Entregue' || status === 'Finalizada') && item.pagamentoStatus !== 'pago') return item;
      if (status === 'Pendente' && item.propostaValor !== undefined) return { ...item, status, valor: item.propostaValor, prazo: item.propostaPrazo ?? item.prazo };
      if (status === 'Finalizada') return { ...item, status, concluidaEm: new Date().toISOString() };
      return { ...item, status };
    }));
    this.salvarComissoes();
  }

  vincularCheckout(id: number, paymentId: string, checkoutUrl: string, status: 'pendente' | 'pago' | 'falhou', metodo: 'pix' | 'card' | 'transfer'): void {
    const pagamento = metodo === 'pix' ? 'Pix' : metodo === 'card' ? 'Cartão' : 'Transferência';
    this.comissoesSubject.next(this.comissoesSubject.value.map((item) => item.id === id && item.status === 'Pendente' ? { ...item, paymentId, checkoutUrl, pagamento, pagamentoStatus: status } : item));
    this.salvarComissoes();
  }

  atualizarPagamento(id: number, status: 'pendente' | 'pago' | 'falhou'): void {
    this.comissoesSubject.next(this.comissoesSubject.value.map((item) => item.id === id && item.status === 'Pendente' ? { ...item, pagamentoStatus: status } : item));
    this.salvarComissoes();
  }

  enviarProposta(id: number, valor: number, prazo: string): void {
    if (!Number.isFinite(valor) || valor <= 0 || !prazo.trim()) return;
    this.comissoesSubject.next(this.comissoesSubject.value.map((item) => item.id === id && item.status === 'Solicitada'
      ? { ...item, status: 'Aguardando aprovação do cliente', propostaValor: valor, propostaPrazo: prazo.trim() }
      : item));
    this.salvarComissoes();
  }

  registrarEntrega(id: number, arquivoEntrega: string, observacaoEntrega: string): void {
    this.comissoesSubject.next(this.comissoesSubject.value.map((item) => item.id === id && item.pagamentoStatus === 'pago' && item.status === 'Em andamento' ? { ...item, arquivoEntrega, observacaoEntrega, status: 'Entregue' } : item));
    this.salvarComissoes();
  }

  obterPrivacidade(username: string): PrivacidadeArtista { return { ...(this.privacidade.get(username) ?? PRIVACIDADE_PADRAO) }; }
  salvarPrivacidade(username: string, dados: PrivacidadeArtista): void { this.privacidade.set(username, { ...dados }); this.salvarPrivacidadeMap(); }
}
>>>>>>> origin/master
