import { Component, OnInit } from '@angular/core';
import { Book } from '../interface/book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  books: Book[] = [];

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    const cartItems = localStorage.getItem('cart');
    if (cartItems) {
      this.books = JSON.parse(cartItems);
    }
  }

  removeFromCart(book: Book) {
    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.books));
    }
  }

  commander() {
    // Logique pour passer la commande
  }
}
