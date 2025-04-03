import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  template: `
    <div *ngIf="toast.show" 
        class="fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg text-white animate-fade-in-down"
        [class.bg-green-500]="toast.type === 'success'"
        [class.bg-red-500]="toast.type === 'error'"
        [class.bg-blue-500]="toast.type === 'info'">
      {{ toast.message }}
    </div>
  `,
  styles: [`
    .animate-fade-in-down {
      animation: fadeInDown 0.3s ease-out;
    }
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class ToastComponent {
  toast = { message: '', type: 'info', show: false };

  constructor(private toastService: ToastService) {
    this.toastService.toastState.subscribe(state => {
      this.toast = state;
    });
  }
}
