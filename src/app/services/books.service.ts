import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from 'src/models/Book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiURL = "https://fakerestapi.azurewebsites.net/api/books";

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL);
  }

  // getBook(bookId: string): Observable<Book> {
  //   let params = new HttpParams().set('incluirDirecciones', "true");
  //   return this.http.get<Book>(this.apiURL + '/' + bookId, {params: params});
  // }

  createBook(body): Observable<Book> {
    return this.http.post<Book>(this.apiURL, body);
  }

  updateBook(ID, body): Observable<Book> {
    return this.http.put<Book>(this.apiURL + "/" + ID, body);
  }

  deleteBook(ID): Observable<Book> {
    return this.http.delete<Book>(this.apiURL + "/" + ID);
  }
}
