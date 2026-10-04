import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MOCK_USUARIOS, UsuarioMock, TipoUsuario } from '../app/mocks/usuarios.mock';
import { PerfilService } from './perfil.service';

export interface SessaoUsuario {
  idUsuario: string;
  nomeUsuario: string;
  tipoUsuario: TipoUsuario;
  nome: string;
  nomeArtistico?: string;
  fotoPerfil: string;
}

const STORAGE_SESSAO = 'usuarioLogado';
const STORAGE_CADASTROS = 'charte:usuarios-cadastrados:v1';
const STORAGE_CONTAS_EXCLUIDAS = 'charte:contas-excluidas:v1';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarios = this.carregarUsuarios();
  private usuarioLogadoSubject = new BehaviorSubject<SessaoUsuario | null>(this.carregarSessao());
  usuarioLogado$: Observable<SessaoUsuario | null> = this.usuarioLogadoSubject.asObservable();

  constructor(private perfis: PerfilService) {}

  private carregarUsuarios(): UsuarioMock[] {
    try {
      const dados = localStorage.getItem(STORAGE_CADASTROS);
      const cadastrados = dados ? JSON.parse(dados) as UsuarioMock[] : [];
      const excluidos = this.contasExcluidas();
      return [...MOCK_USUARIOS, ...(Array.isArray(cadastrados) ? cadastrados.filter((novo) => !MOCK_USUARIOS.some((mock) => mock.idUsuario === novo.idUsuario)) : [])]
        .filter((usuario) => !excluidos.has(usuario.idUsuario));
    } catch { return [...MOCK_USUARIOS]; }
  }

  private contasExcluidas(): Set<string> {
    try {
      const dados = localStorage.getItem(STORAGE_CONTAS_EXCLUIDAS);
      const ids = dados ? JSON.parse(dados) as unknown : [];
      return new Set(Array.isArray(ids) ? ids.filter((id): id is string => typeof id === 'string') : []);
    } catch { return new Set(); }
  }

  private async gerarHashSenha(senha: string, saltHex: string): Promise<string> {
    const salt = Uint8Array.from(saltHex.match(/.{1,2}/g) ?? [], (byte) => Number.parseInt(byte, 16));
    const chave = await crypto.subtle.importKey('raw', new TextEncoder().encode(senha), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' }, chave, 256);
    return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  private novoSalt(): string {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  private persistirCadastros(): void {
    try {
      localStorage.setItem(STORAGE_CADASTROS, JSON.stringify(this.usuarios.filter((usuario) => !MOCK_USUARIOS.some((mock) => mock.idUsuario === usuario.idUsuario))));
    } catch { /* Contas criadas continuam disponíveis na sessão atual. */ }
  }

  private carregarSessao(): SessaoUsuario | null {
    try {
      const data = localStorage.getItem(STORAGE_SESSAO);
      return data ? JSON.parse(data) : null;
    } catch { return null; }
  }

  async login(nomeUsuario: string, senha: string, tipoEsperado?: TipoUsuario): Promise<boolean> {
    const usuario = this.usuarios.find((u) => u.nomeUsuario.toLowerCase() === nomeUsuario.trim().toLowerCase() && (!tipoEsperado || u.tipoUsuario === tipoEsperado));
    if (!usuario) return false;
    const senhaValida = usuario.senhaHash && usuario.senhaSalt
      ? (await this.gerarHashSenha(senha, usuario.senhaSalt)) === usuario.senhaHash
      : usuario.senha === senha;
    if (!senhaValida) return false;
    if (!usuario) return false;
    const sessao: SessaoUsuario = {
      idUsuario: usuario.idUsuario,
      nomeUsuario: usuario.nomeUsuario,
      tipoUsuario: usuario.tipoUsuario,
      nome: usuario.nome,
      nomeArtistico: usuario.nomeArtistico,
      fotoPerfil: usuario.fotoPerfil,
    };
    localStorage.setItem(STORAGE_SESSAO, JSON.stringify(sessao));
    this.usuarioLogadoSubject.next(sessao);
    return true;
  }

  async registrar(dados: { nome: string; nomeUsuario: string; email: string; senha: string; tipoUsuario: TipoUsuario; nomeArtistico?: string }): Promise<SessaoUsuario | null> {
    const nomeUsuario = dados.nomeUsuario.trim().replace(/^@/, '');
    const email = dados.email.trim().toLowerCase();
    if (!/^[a-zA-Z0-9_.]{3,24}$/.test(nomeUsuario) || dados.senha.length < 6 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
    if (this.usuarios.some((item) => item.nomeUsuario.toLowerCase() === nomeUsuario.toLowerCase() || item.email?.toLowerCase() === email)) return null;
    if (!this.perfis.nomeUsuarioDisponivel(nomeUsuario)) return null;

    const senhaSalt = this.novoSalt();
    const senhaHash = await this.gerarHashSenha(dados.senha, senhaSalt);
    const usuario: UsuarioMock = {
      idUsuario: globalThis.crypto?.randomUUID?.() ?? `charte-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      nomeUsuario,
      senha: '',
      senhaHash,
      senhaSalt,
      tipoUsuario: dados.tipoUsuario,
      nome: dados.nome.trim(),
      nomeArtistico: dados.tipoUsuario === 'Artista' ? (dados.nomeArtistico?.trim() || dados.nome.trim()) : undefined,
      fotoPerfil: '/gato.jpeg',
      email,
    };
    const perfil = this.perfis.criarPerfil({ ...usuario, tipoUsuario: usuario.tipoUsuario, email });
    if (!perfil) return null;
    this.usuarios = [...this.usuarios, usuario];
    this.persistirCadastros();
    if (!await this.login(nomeUsuario, dados.senha, dados.tipoUsuario)) return null;
    return this.usuarioLogadoSubject.value;
  }

  getUsuarioLogado(): SessaoUsuario | null { return this.usuarioLogadoSubject.value; }
  obterEmailUsuarioLogado(): string {
    const sessao = this.usuarioLogadoSubject.value;
    return this.usuarios.find((item) => item.idUsuario === sessao?.idUsuario)?.email ?? '';
  }
  estaLogado(): boolean { return this.usuarioLogadoSubject.value !== null; }

  logout(): void {
    localStorage.removeItem(STORAGE_SESSAO);
    this.usuarioLogadoSubject.next(null);
  }

  excluirContaLogada(): boolean {
    const sessao = this.usuarioLogadoSubject.value;
    if (!sessao) return false;
    const excluidas = this.contasExcluidas();
    excluidas.add(sessao.idUsuario);
    try { localStorage.setItem(STORAGE_CONTAS_EXCLUIDAS, JSON.stringify([...excluidas])); } catch { /* A remoção ainda vale durante esta sessão. */ }
    this.usuarios = this.usuarios.filter((usuario) => usuario.idUsuario !== sessao.idUsuario);
    this.persistirCadastros();
    this.perfis.removerPerfil(sessao.idUsuario);
    this.logout();
    return true;
  }

  atualizarEmailMock(email: string): boolean {
    const sessao = this.usuarioLogadoSubject.value;
    if (!sessao || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    const usuario = this.usuarios.find((item) => item.idUsuario === sessao.idUsuario);
    if (!usuario) return false;
    usuario.email = email.trim();
    this.persistirCadastros();
    return true;
  }

  async atualizarSenhaMock(senhaAtual: string, novaSenha: string): Promise<boolean> {
    const sessao = this.usuarioLogadoSubject.value;
    const usuario = this.usuarios.find((item) => item.idUsuario === sessao?.idUsuario);
    if (!usuario || novaSenha.length < 6) return false;
    const senhaValida = usuario.senhaHash && usuario.senhaSalt
      ? (await this.gerarHashSenha(senhaAtual, usuario.senhaSalt)) === usuario.senhaHash
      : usuario.senha === senhaAtual;
    if (!senhaValida) return false;
    if (usuario.senhaHash) {
      usuario.senhaSalt = this.novoSalt();
      usuario.senhaHash = await this.gerarHashSenha(novaSenha, usuario.senhaSalt);
    } else { usuario.senha = novaSenha; }
    this.persistirCadastros();
    return true;
  }

  atualizarFotoPerfilMock(fotoPerfil: string): void {
    const sessao = this.usuarioLogadoSubject.value;
    if (!sessao) return;
    const usuario = this.usuarios.find((item) => item.idUsuario === sessao.idUsuario);
    if (!usuario) return;
    usuario.fotoPerfil = fotoPerfil;
    this.persistirCadastros();
    const atualizada = { ...sessao, fotoPerfil };
    localStorage.setItem(STORAGE_SESSAO, JSON.stringify(atualizada));
    this.usuarioLogadoSubject.next(atualizada);
  }

  atualizarUsernameMock(username: string): boolean {
    const sessao = this.usuarioLogadoSubject.value;
    const nome = username.trim().replace(/^@/, '');
    if (!sessao || !/^[a-zA-Z0-9_.]{3,24}$/.test(nome)) return false;
    if (this.usuarios.some((item) => item.idUsuario !== sessao.idUsuario && item.nomeUsuario.toLowerCase() === nome.toLowerCase())) return false;
    const usuario = this.usuarios.find((item) => item.idUsuario === sessao.idUsuario);
    if (!usuario) return false;
    usuario.nomeUsuario = nome;
    this.persistirCadastros();
    const atualizada = { ...sessao, nomeUsuario: nome };
    localStorage.setItem(STORAGE_SESSAO, JSON.stringify(atualizada));
    this.usuarioLogadoSubject.next(atualizada);
    return true;
  }
}
