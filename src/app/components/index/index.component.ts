import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/models/Book';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // libro;
  // allBooks: any;


  constructor(/* private book: BooksService,
              public  _ActivatedRoute: ActivatedRoute */
    ) { }

  ngOnInit() {


    // this.book.getBooks().subscribe(
    //   data => {
    //     console.log("books::",data);
    //     this.allBooks = data;
    //     this.getOneBook();

    //   },
    //   error => {
    //     console.log("some error occured");
    //     console.log(error.errorMessage);
    //   });
  

  }

  // getOneBook(){


  //   if(this._ActivatedRoute.snapshot.params['id']){
  //     this.libro = this.allBooks.filter((book: Book)=>(
  //       book.ID.toString() == this._ActivatedRoute.snapshot.params['id']
        
  //     ))
  //     console.log(":::::::::::", this.libro)
  //     this.allBooks = this.libro
  //   }
  //   else{

  //   }
     
  // }

}
