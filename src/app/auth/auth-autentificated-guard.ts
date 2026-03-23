import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from './auth-services';
import { inject } from '@angular/core';

export const authAutentificatedGuard: CanActivateFn = (route, state) => {
  const authServices = inject(AuthServices);
  const router = inject(Router);

  return authServices.isAutentificated();
};
