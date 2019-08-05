import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dateSesion: any;
  createBook = false;
  ocultButton = true;
  createBookForm: FormGroup
  submitted = false;
  arregloCrear: any;
  public imagePath;
  imgURL: any;
  public message: string;


  constructor(public booksService: BooksService,
             public formBuilder: FormBuilder,
      ) { }

  ngOnInit() {

    this.extractDate();

    this.createBookForm = this.formBuilder.group({
      // id: ['', Validators.required],
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      extracto: ['', Validators.required],
      numPaginas: ['', Validators.required],
      imagen: ['', Validators.required],
    });
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

  newBook(){
    this.createBook = true;
    this.ocultButton = false

  }

  extractDate(){
    this.dateSesion = localStorage.getItem('sesion')

  }

  // preview(){
  //   var previewImage = document.getElementById("imagen");

  //   console.log("ruta imagen", previewImage)

  // }

    create(){
      // var id:any = this.createBookForm.get("id").value;
      var Title:any = this.createBookForm.get("titulo").value;
      var PublishDate:any = this.createBookForm.get("fecha").value;
      var Description:any = this.createBookForm.get("descripcion").value;
      var Excerpt:any = this.createBookForm.get("extracto").value;
      var PageCount:any = this.createBookForm.get("numPaginas").value;
      var imagen:any = this.createBookForm.get("imagen").value;

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
      console.log("Invalido: ", this.createBookForm.invalid);
      if(this.createBookForm.invalid == false) {
      //  debugger
      /* Consumir servicio peticion POST*/ 
      this.booksService.createBook(this.arregloCrear).subscribe(
        data => {
            /* this.toastr.success('¡EMAIL ENVIADO CORRECTAMENTE!', 'Registro Exitoso'); */

            /* METER DATOS EN EL LOCALSTORAGE */
            let arregloNewBook;
            arregloNewBook = JSON.stringify(this.arregloCrear)
             localStorage.setItem(this.arregloCrear.Title, arregloNewBook)
            this.imgURL = false;
            this.ocultButton = true;
            this.createBook = false;
            this.submitted = false;
            this.createBookForm.reset();

            /* swal alert */
            Swal.fire(
              'Buen trabajo!',
              'Libro guardado exitosamente!',
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
    get f() { return this.createBookForm.controls; }  

    saveData() {

      this.submitted = true;

      // stop here if form is invalid
      if (this.createBookForm.invalid) {
        return;
      }

    }

}
