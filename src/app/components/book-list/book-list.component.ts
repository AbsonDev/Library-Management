import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { SearchService } from '../../services/search.service';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">Books</h2>
        <a routerLink="/books/new" class="btn btn-primary">
          <i class="bi bi-plus-circle me-2"></i>Add New Book
        </a>
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" *ngFor="let book of filteredBooks">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ book.title }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ book.author }}</h6>
              <p class="card-text">{{ book.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="badge bg-primary">{{ book.category }}</span>
                <span class="text-muted">ISBN: {{ book.isbn }}</span>
              </div>
            </div>
            <div class="card-footer bg-transparent border-top-0">
              <div class="d-flex justify-content-between">
                <button class="btn btn-outline-primary btn-sm" (click)="editBook(book)">
                  <i class="bi bi-pencil me-1"></i>Edit
                </button>
                <button class="btn btn-outline-danger btn-sm" (click)="deleteBook(book)">
                  <i class="bi bi-trash me-1"></i>Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-4" *ngIf="filteredBooks.length === 0">
        <p class="text-muted">No books found.</p>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .card-subtitle {
      font-size: 1rem;
    }

    .badge {
      font-size: 0.875rem;
      padding: 0.5em 0.75em;
    }

    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
  `]
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  private searchSubscription: Subscription | undefined;
  private routeSubscription: Subscription | undefined;

  constructor(
    private bookService: BookService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadBooks();
    
    // Inscreve-se nas mudanças do termo de busca
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.filterBooks(term);
    });

    // Inscreve-se nas mudanças dos parâmetros da URL
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchService.setSearchTerm(params['search']);
      }
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.filterBooks(this.searchService.getSearchTerm());
    });
  }

  filterBooks(searchTerm: string) {
    if (!searchTerm) {
      this.filteredBooks = this.books;
      return;
    }

    const term = searchTerm.toLowerCase();
    this.filteredBooks = this.books.filter(book => 
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.description.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term) ||
      book.isbn.toLowerCase().includes(term)
    );
  }

  editBook(book: Book) {
    // Implementar edição
    console.log('Edit book:', book);
  }

  deleteBook(book: Book) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(book.id!).subscribe(() => {
        this.loadBooks();
      });
    }
  }
} 