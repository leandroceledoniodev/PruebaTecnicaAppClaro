import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/models/api-response.model';
import { unwrap } from '../../shared/utils/api.operators';
import { Author, AuthorListItem, SaveAuthorRequest } from '../models/author.model';

@Injectable()
export class AuthorsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/authors`;

  getAll(): Observable<AuthorListItem[]> {
    return this.http.get<ApiResponse<AuthorListItem[]>>(this.baseUrl).pipe(unwrap());
  }

  getById(id: number): Observable<Author> {
    return this.http.get<ApiResponse<Author>>(`${this.baseUrl}/${id}`).pipe(unwrap());
  }

  create(request: SaveAuthorRequest): Observable<Author> {
    return this.http.post<ApiResponse<Author>>(this.baseUrl, request).pipe(unwrap());
  }

  update(id: number, request: SaveAuthorRequest): Observable<Author> {
    return this.http.put<ApiResponse<Author>>(`${this.baseUrl}/${id}`, request).pipe(unwrap());
  }

  delete(id: number): Observable<void> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/${id}`).pipe(map(() => undefined));
  }
}
