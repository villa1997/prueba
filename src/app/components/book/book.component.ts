import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from 'src/models/Book';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { error } from '@angular/compiler/src/util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  allBooks;
  libro;
  

  constructor(private book: BooksService,
             public  _ActivatedRoute: ActivatedRoute,
             public _Router: Router
    ) { }

  ngOnInit() {
    this.getAllBooks();
 
  }

  edit(ID){
    this.libro = this.allBooks.filter((book: Book)=>(
      book.ID.toString() == ID,

     this._Router.navigateByUrl(`book/${ID}/edit`)
     
      
    ))
    console.log("information book", this.libro)
    this.allBooks = this.libro

    console.log("Todos los libros",this.allBooks)

   }

  

  getAllBooks(){
    /* Se consume el servicio Peticion GET */
    this.book.getBooks().subscribe(
      data => {
        console.log("books::",data);
        this.allBooks = data;
        this.getOneBook();

      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      });
  }

  bookInformation(ID){
    this.libro = this.allBooks.filter((book: Book)=>(
      book.ID.toString() == ID,

     this._Router.navigateByUrl(`book/${ID}`)
      
    ))
    console.log("information book", this.libro)
    this.allBooks = this.libro

  }


  getOneBook(){


    if(this._ActivatedRoute.snapshot.params['id']){
      this.libro = this.allBooks.filter((book: Book)=>(
        book.ID.toString() == this._ActivatedRoute.snapshot.params['id']   
      ))
      console.log(":::::::::::", this.libro)
      this.allBooks = this.libro
    }
    else{
      

    }
     
  }

  

  delete(ID){
      this.libro = this.allBooks.filter((book: Book)=>(
      book.ID.toString() == ID,
      /* this._Router.navigateByUrl(`book/${ID}`) */
      Swal.fire("Libro eliminado"),
      

      /* Se consume el servicio Peticion DELETE */
      this.book.deleteBook(ID).subscribe(

      ),
      error =>{
        Swal.fire("No se ha podido eliminar !!")
      }
  
    ))
    console.log("information book", this.libro)
    this.allBooks = this.libro

  
   
   }

  

}
