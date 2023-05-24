import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../interface/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router:Router) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(res => {
      this.books = res;
    });
  }

  addToCart(book: Book) {
    let cartItems: Book[] = JSON.parse(localStorage.getItem("cart") || "[]") as Book[];

    const existingBook = cartItems.find(item => item.id === book.id);
    if (existingBook) {
      console.log('Le livre est déjà dans le panier :', existingBook);
    } else {
      cartItems.push(book);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log('Livre ajouté au panier :', book);
    }
  }

  viewBookDetails(book: Book) {
    console.log('Détails du livre :', book);
    this.router.navigate(['books-detail', book.id])
  }
}
