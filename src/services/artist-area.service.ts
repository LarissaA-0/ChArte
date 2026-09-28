import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MOCK_COMISSOES } from '../app/mocks/comissoes.mock';
import { MOCK_AVALIACOES } from '../app/mocks/avaliacoes.mock';
import { AvaliacaoArtista, Comissao, DiretrizComissao, OpcaoComissao, PrivacidadeArtista, StatusComissao } from '../app/models/artist-area';

const PRIVACIDADE_PADRAO: PrivacidadeArtista = { perfilPublico: true, exibirRedesSociais: true, exibirInformacoes: true, aceitarComissoes: true };
const STORAGE_COMISSOES = 'charte:artist-area:comissoes:v1';
const STORAGE_CATALOGO = 'charte:artist-area:catalogo:v1';
const STORAGE_PRIVACIDADE = 'charte:artist-area:privacidade:v1';

const CLONAR_COMISSAO = (item: Comissao): Comissao => ({ ...item, referencias: [...item.referencias], cliente: { ...item.cliente } });

@Injectable({ providedIn: 'root' })
export class ArtistAreaService {
  private readonly comissoesSubject = new BehaviorSubject<Comissao[]>(this.carregarComissoes());
  readonly comissoes$ = this.comissoesSubject.asObservable();
  private readonly catalogoSubject = new BehaviorSubject<{ opcoes: OpcaoComissao[]; diretrizes: DiretrizComissao[] }>(this.carregarCatalogo());
  readonly catalogo$ = this.catalogoSubject.asObservable();
  private readonly privacidade = this.carregarPrivacidade();
  private readonly avaliacoes = MOCK_AVALIACOES.map((item) => ({ ...item }));

  private carregarComissoes(): Comissao[] {
    try {
      const salvo = localStorage.getItem(STORAGE_COMISSOES);
      const dados = salvo ? JSON.parse(salvo) as Comissao[] : null;
      return Array.isArray(dados) ? dados.map(CLONAR_COMISSAO) : MOCK_COMISSOES.map(CLONAR_COMISSAO);
    } catch { return MOCK_COMISSOES.map(CLONAR_COMISSAO); }
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

  private salvarComissoes(): void { try { localStorage.setItem(STORAGE_COMISSOES, JSON.stringify(this.comissoesSubject.value)); } catch { /* O repositório remoto poderá persistir quando estiver configurado. */ } }
  private salvarCatalogo(): void { try { localStorage.setItem(STORAGE_CATALOGO, JSON.stringify(this.catalogoSubject.value)); } catch { /* O repositório remoto poderá persistir quando estiver configurado. */ } }
  private salvarPrivacidadeMap(): void { try { localStorage.setItem(STORAGE_PRIVACIDADE, JSON.stringify(Object.fromEntries(this.privacidade))); } catch { /* O repositório remoto poderá persistir quando estiver configurado. */ } }

  listarComissoes(username: string): Comissao[] {
    return this.comissoesSubject.value.filter((item) => item.artistaUsername.toLowerCase() === username.toLowerCase()).map(CLONAR_COMISSAO);
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
    this.comissoesSubject.next(this.comissoesSubject.value.map((item) => item.id === id ? { ...item, status } : item));
    this.salvarComissoes();
  }

  registrarEntrega(id: number, arquivoEntrega: string, observacaoEntrega: string): void {
    this.comissoesSubject.next(this.comissoesSubject.value.map((item) => item.id === id ? { ...item, arquivoEntrega, observacaoEntrega, status: 'Entregue' } : item));
    this.salvarComissoes();
  }

  obterPrivacidade(username: string): PrivacidadeArtista { return { ...(this.privacidade.get(username) ?? PRIVACIDADE_PADRAO) }; }
  salvarPrivacidade(username: string, dados: PrivacidadeArtista): void { this.privacidade.set(username, { ...dados }); this.salvarPrivacidadeMap(); }
}
