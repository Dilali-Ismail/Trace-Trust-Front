import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../core/models/product.models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/products`;
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  create(product: Product, image?: File): Observable<Product> {
    const formData = new FormData();

    formData.append('product', JSON.stringify(product));
    if (image) formData.append('image', image);
    return this.http.post<Product>(this.apiUrl, formData);
  }
  update(id: string, product: Product, image?: File): Observable<Product> {
    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    if (image) formData.append('image', image);
    return this.http.put<Product>(`${this.apiUrl}/${id}`, formData);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBySku(sku: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/sku/${sku}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }
}
