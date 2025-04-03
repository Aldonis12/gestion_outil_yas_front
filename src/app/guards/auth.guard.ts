import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  
  if(!auth.isLoggedIn()) {
    auth.logout();
    
    toastService.showWarning("Vous devez être connecté pour accéder à cette page !");
    router.navigateByUrl('')
    return false
  }
  
  return true;
};
