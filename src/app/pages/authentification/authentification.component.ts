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

  constructor(private authService: AuthService, private router: Router) {}

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  submitLogin() {
    // Logique pour soumettre le formulaire de connexion
    console.log(this.loginData);
  }

  submitRegistration() {
    // Logique pour soumettre le formulaire d'inscription
    console.log(this.registerData);
  }

  submitForgotPassword() {
    // Logique pour soumettre la réinitialisation du mot de passe
    console.log(this.forgotPasswordData);
  }
}
