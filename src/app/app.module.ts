import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* components */
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { BookComponent } from './components/book/book.component';

/* Ng2SearchPipeModule */
import { Ng2SearchPipeModule } from 'ng2-search-filter';

/* http */

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* reactive forms */

import { ReactiveFormsModule }    from '@angular/forms';
import { FormsModule } from '@angular/forms';

/* Services */
import { BooksService } from './services/books.service';
import { IndexComponent } from './components/index/index.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { EditComponent } from './components/edit/edit.component';

/* sweet alert */
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    RegisterComponent,
    IndexComponent,
    BookComponent,
    DashboardComponent,
    UserComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    [SweetAlert2Module.forRoot()]
  ],
  providers: [
    BooksService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
