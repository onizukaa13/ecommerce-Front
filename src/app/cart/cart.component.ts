import { Component, OnInit } from '@angular/core';
import { Book } from '../interface/book';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interface/user';
import { UserService } from '../services/user.service';
import { Orderline } from '../interface/orderline';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Order } from '../interface/order';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  order: Order = {};
  orderlines: Orderline[] = [];
  books: Book[] = [];
  user: User | null = null;
  orderline: Orderline = {};
  errorStock: boolean = false;

  constructor(private orderService: OrderService, private authService: AuthService, private userService: UserService, private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
    this.loadCartItems();
    this.userService.getUserByEmail(localStorage.getItem('connectedUserEmail') ?? '').subscribe(
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

  incrementQuantity(book: Book) {
    if (book.id !== undefined) {
      this.bookService.getBookById(book.id).subscribe((el) => {
        if (el.stock !== undefined && book.number_ordered !== undefined && book.number_ordered < el.stock) {
          book.number_ordered += 1;
          this.updateCart();
        }
      });
    }
  }
  decrementQuantity(book: Book) {
    if (book.number_ordered !== undefined && book.number_ordered > 1) {
      book.number_ordered -= 1;
      this.updateCart();
    }
  }

  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.books));
  }

  placeOrder() {
    if (localStorage.getItem('connectedUserEmail') === null) {
      this.router.navigateByUrl('/login');
      return
    }
    // Vérification des stocks avant de valider la commande pour chaque livre
    this.errorStock = false;
    this.books.forEach(item => {
      if (item.id !== undefined) {
        this.bookService.getBookById(item.id).subscribe((el) => {
          if (item.number_ordered !== undefined && el.stock !== undefined && item.number_ordered > el.stock) {
            console.error('Certains livres sont en rupture de stock :', item.titre);
            this.errorStock = true;
          }
        })
      }
    });

    //ATTENDRE QUE LA PARTIE AU DESSUS SE LANCE 
    if (!this.errorStock) {


      for (let i = 0; i < this.books.length; i++) {
        if (!(this.books[i].id !== undefined && this.books[i].stock !== undefined && this.books[i].number_ordered !== undefined)) {
          console.log('La quantité de stock n\'a pas été mise à jour pour le livre', this.books[i].titre);
          return;
        }
        this.orderlines.push({ book: this.books[i], quantity: this.books[i].number_ordered })

      }

      this.userService.getUserByEmail(localStorage.getItem('connectedUserEmail') ?? '').subscribe((el) => {
        if (el[0] === undefined) {
          this.router.navigateByUrl('/login');
        }
      });
      const orderDetails = {
        orderlines: this.orderlines,
        user: this.user
      };
      console.log(orderDetails);

      this.orderService.placeOrder(orderDetails).subscribe({
        next: (response) => {
          for (const book of this.books) {
            console.log(book.titre);
            book.stock! -= book.number_ordered!
            this.bookService.updateBook(book.id!, book).subscribe({
              next: (response) => {
                console.log('La quantité de stock a été mise à jour pour le livre', book.titre);
              },
              error: (err) => console.log("Problème de mise à jour de stock")
            });
          }
          this.books = [];
          localStorage.removeItem('cart');
          this.router.navigate(['order-summary', response.id]);
        },
        error: (error) => {
          // Gérer l'erreur lors de la passation de commande
          console.error('Erreur lors du passage de la commande', error);
        }
      });
    }
  }
}