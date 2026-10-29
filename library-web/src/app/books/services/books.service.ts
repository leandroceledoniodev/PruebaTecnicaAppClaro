import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/models/api-response.model';
import { unwrap } from '../../shared/utils/api.operators';
import { Book, BookDetail, SaveBookRequest } from '../models/book.model';

@Injectable()
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/books`;

  getAll(): Observable<Book[]> {
    return this.http.get<ApiResponse<Book[]>>(this.baseUrl).pipe(unwrap());
  }

  getById(id: number): Observable<BookDetail> {
    return this.http.get<ApiResponse<BookDetail>>(`${this.baseUrl}/${id}`).pipe(unwrap());
  }

  create(request: SaveBookRequest): Observable<Book> {
    return this.http.post<ApiResponse<Book>>(this.baseUrl, request).pipe(unwrap());
  }

  update(id: number, request: SaveBookRequest): Observable<Book> {
    return this.http.put<ApiResponse<Book>>(`${this.baseUrl}/${id}`, request).pipe(unwrap());
  }

  delete(id: number): Observable<void> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}
