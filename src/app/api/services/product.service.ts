import { Injectable } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../../core/models/product.models';
import { Observable } from 'rxjs'; 
@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/auth/products`; // ⚠️ Vérifie l'URL exacte !
  constructor(private http: HttpClient) {}
  // "Observable<Product[]>" signifie : "Attends, je vais te renvoyer une liste de produits plus tard"
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
