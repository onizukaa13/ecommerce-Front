import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../interface/book';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-book',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css']
})
export class CreatebookComponent {
  newBook: Book = {};

  constructor(private bookService: BookService,private router:Router) {}

  createBook() {
    // Vérifier la validité du formulaire
    if (this.newBook.titre && this.newBook.author && this.newBook.description && this.newBook.prix && this.newBook.genre) {
      // Appeler le service pour créer le livre
      this.bookService.createBook(this.newBook).subscribe(response => {
        // Traitement de la réponse
        console.log(response);
        // Réinitialiser le formulaire après la création du livre
        this.newBook = {};
        this.router.navigateByUrl('/books')
      });
    }
  }
}
