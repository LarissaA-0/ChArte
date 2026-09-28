import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.estaLogado() || router.createUrlTree(['/'], { queryParams: { returnUrl: state.url } });
};

export const artistGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const usuario = auth.getUsuarioLogado();
  if (usuario?.tipoUsuario === 'Artista') return true;
  return router.createUrlTree(['/'], { queryParams: { returnUrl: state.url } });
};
