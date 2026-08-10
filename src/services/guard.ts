import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioLogado = true;

  if (usuarioLogado) {
    return true;
  }

  return false;
};
