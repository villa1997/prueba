import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  arreglo: any;
  submitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombreRegister: ['', Validators.required],
      usuarioRegister: ['', Validators.required],
      passwordRegister: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }  

  saveData() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

  }

  registrar(){
    //Obtener los datos que proviene de los inputs--
       //Declarar los Inputs
       var nombre:any = this.registerForm.get("nombreRegister").value;
       var usuario:any = this.registerForm.get("usuarioRegister").value;
       var password:any = this.registerForm.get("passwordRegister").value;

       //Declaracion del arreglo que se envia
       this.arreglo={
         nombre: nombre,
         usuario: usuario,
         password: password
       }

       console.log("DATOS:: ", this.arreglo)
       console.log("Invalido: ", this.registerForm.invalid);
       if(this.registerForm.invalid == false) {
         let arregloLocalStorage;
         arregloLocalStorage = JSON.stringify(this.arreglo)
         localStorage.setItem(this.arreglo.usuario, arregloLocalStorage)

         Swal.fire(
          'Usuario Guardado!',
          // 'Login Correcto!',
          'success'
        )


       }
   

 }

}
