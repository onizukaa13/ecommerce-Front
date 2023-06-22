import { Component, OnInit } from '@angular/core';
import { Book } from '../interface/book';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interface/user';
import { UserService } from '../services/user.service';
import { Orderline } from '../interface/orderline';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  books: Book[] = [];
  user: User | null = null;
  orderline:Orderline = {};
  
  constructor(private orderService: OrderService,private authService: AuthService,private userService: UserService) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.userService.getUserByEmail(localStorage.getItem('connectedUserEmail')??'').subscribe(
      (response) => {
       
        
      this.user = response[0]
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      }
    );
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
      books: this.books,
      user: this.user
    };

    this.orderService.placeOrder(orderDetails).subscribe(
      (response) => {
        this.books.forEach((book) => {
          this.orderline.book=book;
          this.orderline.order=response;
          this.orderline.quantity=1;

          this.orderService.setOrderline(this.orderline).subscribe(
            (response) => {
              
              this.orderline={};
              // Traitement réussi pour chaque livre de la commande
            },
            (error) => {   
              this.orderline={};
              // Gérer l'erreur lors de l'enregistrement du livre dans la commande
              console.error('Le livre n\'a pas pu être enregistré dans la commande', error);
            }
          );
        });

        // Traitement réussi de la commande
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