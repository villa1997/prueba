import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/models/Book';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editBookForm: FormGroup;
  submitted = false;
  arregloCrear;
  ocultButton = true;
  public imagePath;
  imgURL: any;
  public message: string;
  allBooks;
  libro;


  constructor(public booksService: BooksService,
              public formBuilder: FormBuilder,
              private book: BooksService,
             public  _ActivatedRoute: ActivatedRoute,
             public _Router: Router

  ) { }

  ngOnInit() {
    this.editBookForm = this.formBuilder.group({
      // id: ['', Validators.required],
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      extracto: ['', Validators.required],
      numPaginas: ['', Validators.required],
      imagen: ['', Validators.required],
    });
    this.getAllBooks();
    // this.editar();

  }

  getAllBooks(){
    /* Se consume el servicio Peticion GET */
    this.book.getBooks().subscribe(
      data => {
        console.log("books::",data);
        this.allBooks = data;
        this.editar();

      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      });
  }

  editar(){
    this.libro = this.allBooks.filter((book: Book)=>(
      book.ID.toString() == this._ActivatedRoute.snapshot.params['id']
      
      
     
      
    ))
    this.editBookForm.get("titulo").setValue(this.libro[0].Title)
    var imagenCortar = this.libro[0].PublishDate.slice([0 [ 10]]);
    this.editBookForm.get("fecha").setValue(imagenCortar) 
    this.editBookForm.get("numPaginas").setValue(this.libro[0].PageCount)
    this.editBookForm.get("descripcion").setValue(this.libro[0].Description)
    this.editBookForm.get("extracto").setValue(this.libro[0].Excerpt)


    console.log("fech", imagenCortar)
    console.log("information book unico para editar", this.libro[0].Title)
    // this.allBooks = this.libro

    // console.log("Todos los libros",this.allBooks)

   }
   /* previsualizacion de imagen */
  preview(files) {
    if (files.length === 0)
      return;
 
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  edit(ID){
    // var id:any = this.createBookForm.get("id").value;
    var Title:any = this.editBookForm.get("titulo").value;
    var PublishDate:any = this.editBookForm.get("fecha").value;
    var Description:any = this.editBookForm.get("descripcion").value;
    var Excerpt:any = this.editBookForm.get("extracto").value;
    var PageCount:any = this.editBookForm.get("numPaginas").value;
    var imagen:any = this.editBookForm.get("imagen").value;

    //Declaracion del arreglo que se envia
    this.arregloCrear={
    // ID: id,
    Title: Title,
    Description: Description,
    PageCount: PageCount,
    Excerpt: Excerpt,
    PublishDate: PublishDate,
    
    // imagen: imagen,
    }

    console.log("DATOS:: ", this.arregloCrear)
    console.log("Invalido: ", this.editBookForm.invalid);
    if(this.editBookForm.invalid == false) {
    //  debugger
    /* Consumir servicio peticion POST*/ 
    this.booksService.updateBook(ID,this.arregloCrear).subscribe(
      data => {
          /* this.toastr.success('¡EMAIL ENVIADO CORRECTAMENTE!', 'Registro Exitoso'); */

          /* METER DATOS EN EL LOCALSTORAGE */
          let arregloEditBook;
          arregloEditBook = JSON.stringify(this.arregloCrear)
           localStorage.setItem(this.arregloCrear.Title, arregloEditBook)
          this.imgURL = false;
          this.ocultButton = true;
          this.submitted = false;
          this.editBookForm.reset();

          /* swal alert */
          Swal.fire(
            'Buen trabajo!',
            'Libro editado exitosamente!',
            'success'
          )
          
          // this.booksService.createBook(this.arregloCrear)
          console.log("Ingresado Correcto::", this.arregloCrear )
      },
      // Manejo de errores.
      error => {
          console.log("ocurrio el siguiente error");
          console.log(error.errorMessage);
      }
    );
  }
}
  // convenience getter for easy access to form fields
  get f() { return this.editBookForm.controls; }  

  saveData() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.editBookForm.invalid) {
      return;
    }

  }

}
