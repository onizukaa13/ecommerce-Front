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
  cartItems: Book[] = [];
  isExistBook: Boolean=false;
  
  constructor(private bookService: BookService, private router:Router) { }
  
  ngOnInit(): void {
    this.bookService.getBooks().subscribe(res => {
      this.cartItems = JSON.parse(localStorage.getItem("cart") || "[]") as Book[];
      
      this.books = res;
    });
  }
  
  addToCart(book: Book) {
    
    this.isExistBook=false;
    this.cartItems.forEach(item =>{
      if (item.id===book.id) {
        if( item.number_ordered!==undefined&&item.stock!==undefined&&item.number_ordered<item.stock){
          item.number_ordered += 1;
        }else{
          alert("Le stock de ce livre est insuffisant.");
          // TODO : notifier l'utillisateur que manque de stock
        }
        this.isExistBook=true
      }
    });
    
    if( !this.isExistBook && book.stock!==undefined && book.stock>=1){
      book.number_ordered=1;
      this.cartItems.push(book);
      console.log('Livre ajouté au panier :', book);
    }else{
      alert("Le stock de ce livre est insuffisant.");
      // TODO : notifier l'utillisateur que manque de stock
    }
    
    // Mettre à jour le panier dans le stockage persistant
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  
  
  viewBookDetails(book: Book) {
    console.log('Détails du livre :', book);
    this.router.navigate(['books-detail', book.id])
  }
}
