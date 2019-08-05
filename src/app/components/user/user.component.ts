import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  sesionStorage;
  constructor() { }

  ngOnInit() {

    this.sesionStorage = JSON.parse(localStorage.getItem('sesion'))

    console.log("USuario actual",this.sesionStorage);
  }
}
