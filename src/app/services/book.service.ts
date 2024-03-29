// src/app/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interface/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8000/api/books'; // Remplacez par l'URL de votre endpoint Symfony.

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number) {
    return this.http.get<Book>(this.apiUrl + "/" + id);
  }

  updateBook(bookId: number, book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${bookId}`;

    return this.http.put<Book>(url, book);
  }

  createBook(book: Book): Observable<Book> {

    return this.http.post<Book>(this.apiUrl, book);

  }

  deleteBook(book: Book): Observable<any> {
    const url = `${this.apiUrl}/${book.id}`;

    return this.http.delete<Book>(url);
  }

}