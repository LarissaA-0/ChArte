import { InjectionToken } from '@angular/core';
import { Comissao } from '../app/models/artist-area';
import { MOCK_COMISSOES } from '../app/mocks/comissoes.mock';

/** Synchronous persistence boundary used by the commission domain service. */
export interface CommissionStore {
  load(): Comissao[];
  save(comissoes: Comissao[]): boolean;
}

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
  }
}

export const COMMISSION_STORE = new InjectionToken<CommissionStore>('COMMISSION_STORE', {
  providedIn: 'root',
  factory: () => new LocalStorageCommissionStore(),
});
