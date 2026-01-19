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
  // Création avec Image
  create(product: Product, image?: File): Observable<Product> {
    const formData = new FormData();
    // On transforme l'objet produit en texte JSON car le backend l'attend en @RequestPart String
    formData.append('product', JSON.stringify(product));
    if (image) formData.append('image', image);
    return this.http.post<Product>(this.apiUrl, formData);
  }
  // Modification avec Image
  update(id: string, product: Product, image?: File): Observable<Product> {
    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    if (image) formData.append('image', image);
    return this.http.put<Product>(`${this.apiUrl}/${id}`, formData);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
