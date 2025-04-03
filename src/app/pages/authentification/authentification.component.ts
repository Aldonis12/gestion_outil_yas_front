import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-authentification',
  imports: [CommonModule, FormsModule],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  activeTab = 'login'; 
  
  loginData = { email: '', password: '' };
  registerData = { name: '', email: '' };
  forgotPasswordData = { email: '' };
  errorMessage: string = '';

  isLoginLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  submitLogin() {
    this.isLoginLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        this.isLoginLoading = false;
        if (response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/tableau-ebs']);
        } else {
          this.errorMessage = 'Token non trouvé dans la réponse.';
          this.toastService.showError(this.errorMessage);
        }
      },
      error: (error) => {
        this.isLoginLoading = false;
        if (error.status === 422 && error.error.errors) {
          let validationErrors = '';
          for (let field in error.error.errors) {
            validationErrors += `${error.error.errors[field].join(', ')}\n`;
          }
          this.errorMessage = validationErrors;
        } else if (error.status === 401 && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
        this.toastService.showError(this.errorMessage);
      }
    });
  }

  submitRegistration() {
    console.log(this.registerData);
  }

  submitForgotPassword() {
    console.log(this.forgotPasswordData);
  }
}
