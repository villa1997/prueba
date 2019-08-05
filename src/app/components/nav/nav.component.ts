import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginForm: FormGroup;
  submittedLogin = false;
  usuario;
  login;
  password;

  constructor(public formBuilder: FormBuilder,
              public router: Router
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }



  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; } 
  
  saveData() {

    this.submittedLogin = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

  }
  

  loginMethod(){
    
    this.usuario = this.loginForm.get("usuario").value;
    this.password = this.loginForm.get("password").value;
    this.login = JSON.parse(localStorage.getItem(this.usuario));
    if(this.login){
      if(this.password == this.login.password){
        
        this.router.navigate(['/dashboard']);
        Swal.fire(
          'Bienvenido!',
          'Login Correcto!',
          'success'
        )
        this.loginForm.reset();
        this.submittedLogin = false;
        localStorage.setItem('sesion', JSON.stringify(this.login));

      }

    } else{
      Swal.fire("Usuario o contraseña invalido")
    }
    //   if(this.usuario == '' && this.password == ''){
    //   Swal.fire("Login Correcto")
    //   window.alert("Debes ingresar usuario y contraseña")

    // }
   
    

  }

 

}
