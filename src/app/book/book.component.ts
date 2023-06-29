import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../interface/book';
import { BookService } from '../services/book.service';
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  cartItems: Book[] = [];
  isExistBook: Boolean=false;
  failedPopUp: Boolean=false;
  successPopUp: Boolean=false;
  connected:Boolean = false
  authorFilter: string = '';
  
  constructor(private bookService: BookService,private authService: AuthService, private router:Router) { }
  
  ngOnInit(): void {
    this.bookService.getBooks().subscribe(res => {
      this.cartItems = JSON.parse(localStorage.getItem("cart") || "[]") as Book[];
      console.log(this.cartItems)
      this.books = res;
      console.log(res)

    });

    let token = this.authService.getToken()
    console.log(token)

    if(token != null){
      this.connected = true
    }

    console.log(this.connected)
  }
  
  addToCart(book: Book) {
    
    this.isExistBook=false;
    console.log(book)
    this.cartItems.forEach(item =>{
      if (item.id===book.id) {
        console.log(item)
        if( item.number_ordered!==undefined&&item.stock!==undefined&&item.number_ordered<item.stock){
          item.number_ordered += 1;
        }else{
          //alert("Le stock de ce livre est insuffisant.");
          this.failedPopUp = true
          console.log(this.failedPopUp)
          // TODO : notifier l'utillisateur que manque de stock
        }
        this.isExistBook=true
      }
    });
    
    if( !this.isExistBook && book.stock!==undefined && book.stock>=1){
      book.number_ordered=1;
      this.cartItems.push(book);
      console.log('Livre ajouté au panier :', book);
      this.successPopUp = true
      console.log(this.successPopUp)
    }else{
      //alert("Le stock de ce livre est insuffisant.");
      this.failedPopUp = true
      console.log(this.failedPopUp)
      // TODO : notifier l'utillisateur que manque de stock
    }
    
    // Mettre à jour le panier dans le stockage persistant
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  haveRole(role: string): boolean {
    return this.authService.haveRole(role);
  }
  
  viewBookDetails(book: Book) {
    console.log('Détails du livre :', book);
    this.router.navigate(['books-detail', book.id])
  }

  closeSuccess(){
    this.successPopUp = false
  }

  closeFailed(){
    this.failedPopUp = false
  }

  filtre_stock(){
    this.books.forEach((element,index) => {
      if(element.stock != undefined && element.stock == 0){
        this.books.splice(index,1)
      } 
    }); 
  }

  filtre_auteur() {
    if (this.authorFilter) {
      this.books = this.books.filter(book =>
        book.author && book.author.toLowerCase().includes(this.authorFilter.toLowerCase())
      );
    } else {
      // Si le filtre est vide, réinitialisez les livres
      this.reset_filter();
    }
  }
  

  reset_filter(){
    this.bookService.getBooks().subscribe(res => {
      this.cartItems = JSON.parse(localStorage.getItem("cart") || "[]") as Book[];
      this.books = res;
      this.authorFilter = '';
    });
  }

  deconnexion(){
    this.authService.logout()
    this.router.navigateByUrl('/login');

  }
}