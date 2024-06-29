import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  public findById(id: number): Observable<Product | undefined> {
    return this.http
      .get<Product>(`${this.apiUrl}/products/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  public save(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  public update(product: Product): Observable<Product> {
    if (!product.id) {
      throw new Error('El producto debería tener un id');
    }
    return this.http.put<Product>(
      `${this.apiUrl}/products/${product.id}`,
      product
    );
  }

  public delete(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/products/${id}`).pipe(
      catchError(() => of(false)),
      map(() => true)
    );
  }
}
