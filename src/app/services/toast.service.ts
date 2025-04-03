import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<{message: string, type: 'success' | 'error' | 'info', show: boolean}>({message: '', type: 'info', show: false});
  toastState = this.toastSubject.asObservable();

  showSuccess(message: string) {
    this.toastSubject.next({message, type: 'success', show: true});
    setTimeout(() => this.hideToast(), 3000);
  }

  showError(message: string) {
    this.toastSubject.next({message, type: 'error', show: true});
    setTimeout(() => this.hideToast(), 3000);
  }

  hideToast() {
    this.toastSubject.next({message: '', type: 'info', show: false});
  }
}
