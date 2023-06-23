import { Component, OnInit } from '@angular/core';
import { Book } from '../interface/book';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { User } from '../interface/user';
import { UserService } from '../services/user.service';
import { Orderline } from '../interface/orderline';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
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
        
        
        const orderDetails = {
          books: this.books,
          user: this.user
        };
        
      
        
        this.userService.getUserByEmail(localStorage.getItem('connectedUserEmail') ?? '').subscribe((el) => {
          if (el[0] === undefined) {
            this.router.navigateByUrl('/login');
          }
        });
        
        this.orderService.placeOrder(orderDetails).subscribe(
          (response) => {
            this.books.forEach((book) => {
              this.orderline.book = book;
              this.orderline.order = response;
              this.orderline.quantity =  1;
              
              this.orderService.setOrderline(this.orderline).subscribe(
                (response) => {
                  this.orderline = {};
                  // Traitement réussi pour chaque livre de la commande
                  
                  // Mettre à jour la quantité de stock dans la base de données
                  if(book.id!==undefined&&book.stock!==undefined&&book.number_ordered!==undefined){
                    book.stock-=book.number_ordered
                     this.bookService.updateBook(book.id, book).subscribe(
                    (response) => {
                      console.log('La quantité de stock a été mise à jour pour le livre', book.titre);
                    },
                    (error) => {
                      console.error('Erreur lors de la mise à jour de la quantité de stock', error);
                    }
                    );}
                  },
                  (error) => {
                    
                    this.orderline = {};
                    // Gérer l'erreur lors de l'enregistrement du livre dans la commande
                    console.error('Le livre n\'a pas pu être enregistré dans la commande', error);
                  }
                  );
                });
                
                // Traitement réussi de la commande
                // Réinitialiser le panier
                this.books = [];
                localStorage.removeItem('cart');
                this.router.navigateByUrl('/order-summaryorder-summary/:id');
              },
              (error) => {
                // Gérer l'erreur lors de la passation de commande
                console.error('Erreur lors du passage de la commande', error);
              }
              );
            }
          }
        }