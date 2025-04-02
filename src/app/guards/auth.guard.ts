import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(!auth.isLoggedIn()) {
    auth.logout();
    
    alert("Vous devez être connecté pour accéder à cette page !");
    router.navigateByUrl('')
    return false
  }
  
  return true;
};
