import { Component, OnInit } from '@angular/core';
import { Book } from '../interface/book';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  books: Book[] = [];

  constructor(private orderService: OrderService,private authService: AuthService) {}

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

  placeOrder() {
    const orderDetails = {
      books: this.books

    };
    this.orderService.placeOrder(orderDetails).subscribe(
      (response) => {
        // Traitement réussi de la commande
        console.log('Commande passée avec succès', response);
        // Réinitialiser le panier
        this.books = [];
        localStorage.removeItem('cart');
      },
      (error) => {
        // Gérer l'erreur lors de la passation de commande
        console.error('Erreur lors de la passation de commande', error);
      }
    );
  }
}
