import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  submitLogin() {
    alert(this.loginData.email);
    alert(this.loginData.password);
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      (response) => {
        if (response.token) {
          // this.authService.saveToken(response.token);
          // this.router.navigate(['/dashboard']);
          alert(response.token);
        } else {
          this.errorMessage = 'Token non trouvé dans la réponse.';
          alert(this.errorMessage);
        }
      },
      (error) => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    );
  }

  submitRegistration() {
    console.log(this.registerData);
  }

  submitForgotPassword() {
    console.log(this.forgotPasswordData);
  }
}
