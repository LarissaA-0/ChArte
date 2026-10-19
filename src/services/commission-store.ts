<<<<<<< HEAD
import { InjectionToken, inject } from '@angular/core';
import { Comissao } from '../app/models/artist-area';
import { ArtistAreaService } from './artist-area.service';
=======
import { InjectionToken } from '@angular/core';
import { Comissao } from '../app/models/artist-area';
import { MOCK_COMISSOES } from '../app/mocks/comissoes.mock';
>>>>>>> origin/master

/** Synchronous persistence boundary used by the commission domain service. */
export interface CommissionStore {
  load(): Comissao[];
  save(comissoes: Comissao[]): boolean;
}

<<<<<<< HEAD
/** Supabase store - delegates to ArtistAreaService for actual data. */
export class SupabaseCommissionStore implements CommissionStore {
  private artistArea: ArtistAreaService;

  constructor() {
    this.artistArea = inject(ArtistAreaService);
  }

  load(): Comissao[] {
    // Os dados reais são gerenciados de forma reativa por ArtistAreaService.
    // Retornamos o snapshot atual do subject para quem precisar do valor síncrono.
    // Nota: o subject é inicializado como []; os dados reais são carregados
    // de forma assíncrona no constructor do ArtistAreaService.
    return this.artistArea.obterComissoesAtuais();
  }

  save(comissoes: Comissao[]): boolean {
    // A persistência real ocorre em ArtistAreaService via Supabase.
    // Este método mantém compatibilidade de assinatura mas não faz nada
    // porque os dados já são gerenciados de forma reativa.
    console.warn(
      'SupabaseCommissionStore.save() é um no-op: os dados são gerenciados por ArtistAreaService.',
    );
    return true;
=======
/** Browser prototype store. Moving to an API will also make service commands asynchronous. */
export class LocalStorageCommissionStore implements CommissionStore {
  private readonly key = 'charte:artist-area:comissoes:v1';

  load(): Comissao[] {
    try {
      const salvo = localStorage.getItem(this.key);
      const dados = salvo ? JSON.parse(salvo) as Comissao[] : null;
      return Array.isArray(dados) ? dados : MOCK_COMISSOES;
    } catch {
      return MOCK_COMISSOES;
    }
  }

  save(comissoes: Comissao[]): boolean {
    try {
      localStorage.setItem(this.key, JSON.stringify(comissoes));
      return true;
    } catch {
      return false;
    }
>>>>>>> origin/master
  }
}

export const COMMISSION_STORE = new InjectionToken<CommissionStore>('COMMISSION_STORE', {
  providedIn: 'root',
<<<<<<< HEAD
  factory: () => new SupabaseCommissionStore(),
});
=======
  factory: () => new LocalStorageCommissionStore(),
});
>>>>>>> origin/master
