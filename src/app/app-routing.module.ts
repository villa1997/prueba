import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { BookComponent } from './components/book/book.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  
  { path: 'index', component: IndexComponent },
  { path: 'index/:id', component: IndexComponent },
  { path: 'book', component: BookComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'book/:id/edit', component: EditComponent },
  { path: 'edit', component: EditComponent },



  /* redireccionar cuando url este vacia */
  {path: '', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
