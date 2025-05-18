import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">{{ isEditing ? 'Edit Book' : 'New Book' }}</h3>
            </div>
            <div class="card-body">
              <form (ngSubmit)="onSubmit()" #bookForm="ngForm">
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="title" 
                    name="title"
                    [(ngModel)]="book.title"
                    required
                    #title="ngModel"
                  >
                  <div class="invalid-feedback" *ngIf="title.invalid && title.touched">
                    Title is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="author" class="form-label">Author</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="author" 
                    name="author"
                    [(ngModel)]="book.author"
                    required
                    #author="ngModel"
                  >
                  <div class="invalid-feedback" *ngIf="author.invalid && author.touched">
                    Author is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea 
                    class="form-control" 
                    id="description" 
                    name="description"
                    rows="3"
                    [(ngModel)]="book.description"
                    required
                    #description="ngModel"
                  ></textarea>
                  <div class="invalid-feedback" *ngIf="description.invalid && description.touched">
                    Description is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="isbn" class="form-label">ISBN</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="isbn" 
                    name="isbn"
                    [(ngModel)]="book.isbn"
                    required
                    #isbn="ngModel"
                  >
                  <div class="invalid-feedback" *ngIf="isbn.invalid && isbn.touched">
                    ISBN is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="category" class="form-label">Category</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="category" 
                    name="category"
                    [(ngModel)]="book.category"
                    required
                    #category="ngModel"
                  >
                  <div class="invalid-feedback" *ngIf="category.invalid && category.touched">
                    Category is required
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="publicationYear" class="form-label">Publication Year</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      id="publicationYear" 
                      name="publicationYear"
                      [(ngModel)]="book.publicationYear"
                      required
                      #publicationYear="ngModel"
                    >
                    <div class="invalid-feedback" *ngIf="publicationYear.invalid && publicationYear.touched">
                      Publication year is required
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="quantity" class="form-label">Quantity</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      id="quantity" 
                      name="quantity"
                      [(ngModel)]="book.quantity"
                      required
                      min="0"
                      #quantity="ngModel"
                    >
                    <div class="invalid-feedback" *ngIf="quantity.invalid && quantity.touched">
                      Quantity is required and must be positive
                    </div>
                  </div>
                </div>

                <div class="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    class="form-check-input" 
                    id="available" 
                    name="available"
                    [(ngModel)]="book.available"
                  >
                  <label class="form-check-label" for="available">Available</label>
                </div>

                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-secondary" (click)="goBack()">
                    <i class="bi bi-arrow-left me-2"></i>Back
                  </button>
                  <button type="submit" class="btn btn-primary" [disabled]="bookForm.invalid">
                    <i class="bi bi-save me-2"></i>{{ isEditing ? 'Update' : 'Save' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .card-header {
      background-color: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
    }

    .form-label {
      font-weight: 500;
    }

    .btn {
      padding: 0.5rem 1.5rem;
    }

    .btn i {
      font-size: 1.1rem;
    }
  `]
})
export class BookFormComponent implements OnInit {
  book: Book = {
    title: '',
    author: '',
    description: '',
    isbn: '',
    category: '',
    publicationYear: new Date().getFullYear(),
    quantity: 1,
    available: true
  };
  isEditing = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadBook(id);
    }
  }

  loadBook(id: string) {
    this.bookService.getBook(id).subscribe(book => {
      if (book) {
        this.book = book;
      }
    });
  }

  onSubmit() {
    if (this.isEditing) {
      this.bookService.updateBook(this.book.id!, this.book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.bookService.addBook(this.book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }

  goBack() {
    this.router.navigate(['/books']);
  }
} 