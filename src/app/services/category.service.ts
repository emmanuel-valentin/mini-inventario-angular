import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category.interface';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  public findById(id: number): Observable<Category | undefined> {
    return this.http
      .get<Category>(`${this.apiUrl}/categories/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  public save(category: Category): Observable<Category> {
    return this.http.post<Category>(
      `${this.apiUrl}/categories`,
      category
    );
  }

  public update(category: Category): Observable<Category> {
    if (!category.id) {
      throw new Error('La categoría debería tener un id');
    }
    return this.http.put<Category>(
      `${this.apiUrl}/categories/${category.id}`,
      category
    );
  }

  public delete(id: number): Observable<boolean> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
