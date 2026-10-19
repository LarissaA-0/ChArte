import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Observable, from, of } from 'rxjs';
import { PerfilView } from '../app/models/perfil';
import { supabase } from '../app/core/supabase/supabase.client';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PerfilService {

  getPerfil(nomeUsuario: string): Observable<PerfilView | null> {
    const nome = nomeUsuario.trim().toLowerCase();
    return from(this.buscarPerfilNoBanco(nome)).pipe(
      catchError(() => of(null))
    );
  }

  private async buscarPerfilNoBanco(nomeUsuario: string): Promise<PerfilView | null> {
    const { data: usuario, error } = await supabase
      .from('usuario')
      .select(`
        id_usuario,
        nome_usuario,
        nome,
        foto_perfil,
        banner_perfil,
        bio,
        tipo_usuario,
        seguidores,
        seguindo,
        avaliacao_media,
        total_reviews
      `)
      .ilike('nome_usuario', nomeUsuario)
      .single();

    if (error || !usuario) {
      return null;
    }

    let artistaData: {
      id_artista: number;
      nome_artistico: string;
      bio: string;
      total_reviews: number;
      data_inicio: string;
      avaliacao_media: number;
    } | null = null;

    if (usuario.tipo_usuario === 'Artista') {
      const { data: artista } = await supabase
        .from('artista')
        .select('id_artista, nome_artistico, bio, total_reviews, data_inicio, avaliacao_media')
        .eq('id_usuario', usuario.id_usuario)
        .single();
      artistaData = artista;
    }

    const { data: redesSociais } = await supabase
      .from('redes_sociais')
      .select('twitter, instagram, tiktok, youtube')
      .eq('id_usuario', usuario.id_usuario)
      .single();

    return {
      idUsuario: usuario.id_usuario.toString(),
      nomeUsuario: usuario.nome_usuario,
      nome: usuario.nome,
      nomeArtistico: artistaData?.nome_artistico,
      fotoPerfil: usuario.foto_perfil || '/gato.jpeg',
      banner: usuario.banner_perfil || '/nimona.jpeg',
      bio: artistaData?.bio || usuario.bio || '',
      tipoUsuario: usuario.tipo_usuario === 'Cliente' ? 'Comum' : usuario.tipo_usuario,
      seguidores: usuario.seguidores || 0,
      seguindo: usuario.seguindo || 0,
      avaliacaoMedia: artistaData?.avaliacao_media ?? usuario.avaliacao_media ?? 0,
      totalReviews: artistaData?.total_reviews ?? usuario.total_reviews ?? 0,
      idArtista: artistaData?.id_artista,
      redesSociais: redesSociais || {},
    };
  }

  async atualizarPerfil(nomeUsuario: string, dadosAtualizados: Partial<PerfilView>): Promise<boolean> {
    const nome = nomeUsuario.trim().toLowerCase();

    const usuarioUpdates: Record<string, unknown> = {};
    if (dadosAtualizados.nome !== undefined) usuarioUpdates['nome'] = dadosAtualizados.nome;
    if (dadosAtualizados.fotoPerfil !== undefined) usuarioUpdates['foto_perfil'] = dadosAtualizados.fotoPerfil;
    if (dadosAtualizados.banner !== undefined) usuarioUpdates['banner_perfil'] = dadosAtualizados.banner;
    if (dadosAtualizados.bio !== undefined) usuarioUpdates['bio'] = dadosAtualizados.bio;

    let sucesso = true;

    if (Object.keys(usuarioUpdates).length > 0) {
      const { error } = await supabase
        .from('usuario')
        .update(usuarioUpdates)
        .ilike('nome_usuario', nome);
      if (error) {
        console.error('Erro ao atualizar usuário:', error);
        sucesso = false;
      }
    }

    if (dadosAtualizados.nomeArtistico !== undefined || dadosAtualizados.bio !== undefined) {
      const { data: usuario } = await supabase
        .from('usuario')
        .select('id_usuario, tipo_usuario')
        .ilike('nome_usuario', nome)
        .single();

      if (usuario && usuario.tipo_usuario === 'Artista') {
        const artistaUpdates: Record<string, unknown> = {};
        if (dadosAtualizados.nomeArtistico !== undefined) artistaUpdates['nome_artistico'] = dadosAtualizados.nomeArtistico;
        if (dadosAtualizados.bio !== undefined) artistaUpdates['bio'] = dadosAtualizados.bio;

        const { error } = await supabase
          .from('artista')
          .update(artistaUpdates)
          .eq('id_usuario', usuario.id_usuario);
        if (error) {
          console.error('Erro ao atualizar artista:', error);
          sucesso = false;
        }
      }
    }

    if (dadosAtualizados.redesSociais) {
      const { data: usuario } = await supabase
        .from('usuario')
        .select('id_usuario')
        .ilike('nome_usuario', nome)
        .single();

      if (usuario) {
        const { error } = await supabase
          .from('redes_sociais')
          .upsert({
            id_usuario: usuario.id_usuario,
            twitter: dadosAtualizados.redesSociais.twitter,
            instagram: dadosAtualizados.redesSociais.instagram,
            tiktok: dadosAtualizados.redesSociais.tiktok,
            youtube: dadosAtualizados.redesSociais.youtube,
          });
        if (error) {
          console.error('Erro ao atualizar redes sociais:', error);
          sucesso = false;
        }
      }
    }

    return sucesso;
  }

  async nomeUsuarioDisponivel(nomeUsuario: string, atual = ''): Promise<boolean> {
    const nome = nomeUsuario.trim().replace(/^@/, '').toLowerCase();
    const atualLower = atual.trim().replace(/^@/, '').toLowerCase();

    if (nome === atualLower) return true;

    const { data, error } = await supabase
      .from('usuario')
      .select('nome_usuario')
      .ilike('nome_usuario', nome)
      .limit(1);

    if (error) return false;
    return !data || data.length === 0;
  }

  async criarPerfil(dados: {
    idUsuario: string;
    nomeUsuario: string;
    nome: string;
    nomeArtistico?: string;
    email: string;
    tipoUsuario: 'Comum' | 'Artista';
  }): Promise<PerfilView | null> {
    // O trigger do banco já cria o perfil no cadastro
    // Este método mantém compatibilidade mas retorna o perfil criado
    return this.buscarPerfilNoBanco(dados.nomeUsuario);
  }

  async removerPerfil(idUsuario: string): Promise<void> {
    // Não remove do banco (exclusão real precisa de Edge Function)
    // Apenas para compatibilidade
  }
}
=======
import { Observable, of, BehaviorSubject } from 'rxjs';
import { PerfilView } from '../app/models/perfil';
import { MOCK_PERFIS } from '../app/mocks/perfis.mock';

const STORAGE_KEY = 'charte:perfis:v1';
const STORAGE_CONTAS_EXCLUIDAS = 'charte:contas-excluidas:v1';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private perfis: PerfilView[] = this.carregarPerfis();
  private perfisSubject = new BehaviorSubject<PerfilView[]>(this.perfis);

  private carregarPerfis(): PerfilView[] {
    try {
      const dadosSalvos = localStorage.getItem(STORAGE_KEY);
      const extras = dadosSalvos ? JSON.parse(dadosSalvos) as PerfilView[] : [];
      const dadosExcluidos = localStorage.getItem(STORAGE_CONTAS_EXCLUIDAS);
      const idsExcluidos = dadosExcluidos ? JSON.parse(dadosExcluidos) as unknown : [];
      const excluidos = new Set(Array.isArray(idsExcluidos) ? idsExcluidos.filter((id): id is string => typeof id === 'string') : []);
      const perfis = Array.isArray(extras)
        ? [...MOCK_PERFIS, ...extras.filter((extra) => !MOCK_PERFIS.some((perfil) => perfil.nomeUsuario.toLowerCase() === extra.nomeUsuario.toLowerCase()))]
        : [...MOCK_PERFIS];
      return perfis.filter((perfil) => !excluidos.has(perfil.idUsuario));
    } catch { return [...MOCK_PERFIS]; }
  }

  private persistirPerfis(): void {
    try {
      const novosPerfis = this.perfis.filter((perfil) => !MOCK_PERFIS.some((mock) => mock.idUsuario === perfil.idUsuario));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novosPerfis));
    } catch { /* Perfis criados continuam disponíveis na sessão atual. */ }
  }

  getPerfil(nomeUsuario: string): Observable<PerfilView | null> {
    const perfil = this.perfis.find((p) => p.nomeUsuario.toLowerCase() === nomeUsuario.trim().toLowerCase());
    return of(perfil ? { ...perfil } : null);
  }

  criarPerfil(dados: { idUsuario: string; nomeUsuario: string; nome: string; nomeArtistico?: string; email: string; tipoUsuario: 'Comum' | 'Artista' }): PerfilView | null {
    if (!this.nomeUsuarioDisponivel(dados.nomeUsuario)) return null;
    const perfil: PerfilView = {
      idUsuario: dados.idUsuario,
      nomeUsuario: dados.nomeUsuario,
      nome: dados.nome,
      nomeArtistico: dados.tipoUsuario === 'Artista' ? (dados.nomeArtistico?.trim() || dados.nome) : undefined,
      fotoPerfil: '/gato.jpeg',
      banner: '/nimona.jpeg',
      bio: '',
      tipoUsuario: dados.tipoUsuario,
      seguidores: 0,
      seguindo: 0,
      avaliacaoMedia: 0,
      totalReviews: 0,
      idArtista: dados.tipoUsuario === 'Artista' ? Math.max(0, ...this.perfis.map((item) => item.idArtista ?? 0)) + 1 : undefined,
      redesSociais: {},
    };
    this.perfis = [...this.perfis, perfil];
    this.perfisSubject.next(this.perfis);
    this.persistirPerfis();
    return { ...perfil };
  }

  atualizarPerfil(nomeUsuario: string, dadosAtualizados: Partial<PerfilView>): boolean {
    const index = this.perfis.findIndex((p) => p.nomeUsuario.toLowerCase() === nomeUsuario.trim().toLowerCase());
    if (index === -1) return false;
    this.perfis[index] = {
      ...this.perfis[index],
      ...dadosAtualizados,
      redesSociais: { ...this.perfis[index].redesSociais, ...dadosAtualizados.redesSociais },
    };
    this.perfisSubject.next([...this.perfis]);
    this.persistirPerfis();
    return true;
  }

  removerPerfil(idUsuario: string): void {
    this.perfis = this.perfis.filter((perfil) => perfil.idUsuario !== idUsuario);
    this.perfisSubject.next([...this.perfis]);
    this.persistirPerfis();
  }

  nomeUsuarioDisponivel(nomeUsuario: string, atual = ''): boolean {
    const nome = nomeUsuario.trim().replace(/^@/, '').toLowerCase();
    return !this.perfis.some((perfil) => perfil.nomeUsuario.toLowerCase() === nome && perfil.nomeUsuario.toLowerCase() !== atual.trim().replace(/^@/, '').toLowerCase());
  }
}
>>>>>>> origin/master
