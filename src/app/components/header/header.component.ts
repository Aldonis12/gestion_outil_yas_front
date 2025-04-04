import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  pageTitle: string = 'LAMBDA';
  isSidebarOpen: boolean = false;
  isUserMenuOpen: boolean = false;
  showSitesSubMenu: boolean = false;
  showReportsSubMenu: boolean = false;

@HostListener('document:click', ['$event'])
onClickOutside(event: Event): void {
  const target = event.target as HTMLElement;
  if (!target.closest('.user-menu') && !target.closest('.sidebar')) {
    this.isUserMenuOpen = false;
  }
}

  username = '';
  userInitials = '';
  userData: any = null;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.updateTitle();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
    this.loadUserData();
    
  }

  private updateTitle(): void {
    let currentRoute = this.activatedRoute.root;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const title = currentRoute.snapshot.data['title'];
    console.log('Titre trouvé :', title);
    this.pageTitle = title || 'LAMBDA';
  }

  loadUserData(): void {
    const user = this.authService.getUser();
    if (user) {
      this.userData = user;
      this.username = user.nom || user.mail || 'Utilisateur';
      
      // Génération des initiales
      if (user.nom) {
        const nameParts = user.nom.split(' ');
        this.userInitials = nameParts
          .map((part: string) => part[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);
      } else {
        this.userInitials = this.username.substring(0, 2).toUpperCase();
      }
    }
  }


  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  toggleSitesSubMenu(): void {
    this.showSitesSubMenu = !this.showSitesSubMenu;
    if (this.showSitesSubMenu) {
      this.showReportsSubMenu = false;
    }
  }
  
  toggleReportsSubMenu(): void {
    this.showReportsSubMenu = !this.showReportsSubMenu;
    if (this.showReportsSubMenu) {
      this.showSitesSubMenu = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
