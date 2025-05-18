import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [];

  constructor() {
    // Os dados de exemplo foram removidos.
    // A lista de livros agora começa vazia.
  }

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBook(id: string): Observable<Book | undefined> {
    const book = this.books.find(b => b.id === id);
    return of(book);
  }

  addBook(book: Book): Observable<Book> {
    const newBook = { ...book, id: Date.now().toString() };
    this.books.push(newBook);
    return of(newBook);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    const index = this.books.findIndex(b => b.id === id);
    if (index !== -1) {
      this.books[index] = { ...book, id };
      return of(this.books[index]);
    }
    return of(book);
  }

  deleteBook(id: string): Observable<void> {
    const index = this.books.findIndex(b => b.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
    return of(void 0);
  }
} 