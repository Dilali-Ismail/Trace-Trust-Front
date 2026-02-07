import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product, ProductQuery } from '../../../core/models/product.models';
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

   list(query: ProductQuery): Observable<any> {
    let params = new HttpParams()
      .set('page', query.page.toString())
      .set('size', query.size.toString())
      .set('active', query.active.toString())
      .set('sort', query.sort);
    if (query.search) {
      params = params.set('search', query.search);
    }

    if (query.category && query.category !== 'all') {
      params = params.set('category', query.category); // Adapter selon votre API (categoryId? categoryName?)
    }
    // On attend une réponse paginée type Spring Data
    // Interface: { content: Product[], totalElements: number, totalPages: number }
    return this.http.get<any>(this.apiUrl, { params });
  }
}
