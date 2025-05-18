import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" routerLink="/">
          <i class="bi bi-book fs-4 me-2"></i>
          <span class="fw-bold">Library Management</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center" routerLink="/books" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
                <i class="bi bi-list-ul me-2"></i>
                <span>Books</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex align-items-center" routerLink="/books/new" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
                <i class="bi bi-plus-circle me-2"></i>
                <span>New Book</span>
              </a>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>

    <main class="container py-4">
      <router-outlet></router-outlet>
    </main>

    <footer class="footer mt-auto py-3 bg-light">
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col-md-6">
            <span class="text-muted">© 2024 Library Management System</span>
          </div>
          <div class="col-md-6">
            <div class="social-links">
              <a href="#" class="text-muted me-3"><i class="bi bi-github"></i></a>
              <a href="#" class="text-muted me-3"><i class="bi bi-linkedin"></i></a>
              <a href="#" class="text-muted"><i class="bi bi-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      flex: 1;
    }

    .navbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 0.8rem 0;
    }

    .navbar-brand {
      font-size: 1.5rem;
      transition: transform 0.3s ease;
    }

    .navbar-brand:hover {
      transform: scale(1.05);
    }

    .nav-item .nav-link {
      position: relative;
      padding: 0.5rem 1rem;
      transition: color 0.3s ease;
      border-bottom: 2px solid transparent;
    }

    .nav-item .nav-link:hover {
      color: #f8f9fa;
    }

    .nav-item .nav-link.active {
      color: white;
      border-bottom-color: white;
    }

    .input-group {
      width: 300px;
    }

    .input-group .form-control {
      border-right: none;
    }

    .input-group .btn {
      border-left: none;
      background-color: white;
    }

    .input-group .btn:hover {
      background-color: #f8f9fa;
    }

    .dropdown-menu {
      border: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .dropdown-item {
      padding: 0.5rem 1rem;
      transition: background-color 0.2s ease;
    }

    .dropdown-item:hover {
      background-color: #f8f9fa;
    }

    .footer {
      box-shadow: 0 -2px 4px rgba(0,0,0,0.05);
    }

    .social-links a {
      font-size: 1.2rem;
      transition: color 0.3s ease;
    }

    .social-links a:hover {
      color: var(--bs-primary) !important;
    }

    .card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    @media (max-width: 991.98px) {
      .input-group {
        width: 100%;
        margin: 1rem 0;
      }
      
      .navbar-nav {
        margin-bottom: 1rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'library-app';
  searchQuery: string = '';

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchService.setSearchTerm(this.searchQuery.trim());
      // Navega para a página de livros com o termo de busca
      this.router.navigate(['/books'], { 
        queryParams: { search: this.searchQuery.trim() }
      });
    }
  }
}
