/**
 * 🎓 CONCEPT: Service & Dependency Injection
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Supplier, CreateSupplierDTO, UpdateSupplierDTO } from '../../../core/models/supplier.models';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {

    // 🟢 FIX LOCAL: On ajoute /api ici car environment.apiUrl est http://localhost:8080
    private apiUrl = `${environment.apiUrl}/api/suppliers`;

    constructor(private http: HttpClient) { }

    getSuppliers(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(this.apiUrl).pipe(
            tap(data => console.log(`📦 ${data.length} fournisseurs chargés`)),
            catchError(this.handleError)
        );
    }

    getSupplier(id: string): Observable<Supplier> {
        return this.http.get<Supplier>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    createSupplier(supplier: CreateSupplierDTO): Observable<Supplier> {
        return this.http.post<Supplier>(this.apiUrl, supplier).pipe(
            tap(created => console.log(`✅ Créé: ${created.name}`)),
            catchError(this.handleError)
        );
    }

    updateSupplier(id: string, supplier: UpdateSupplierDTO): Observable<Supplier> {
        return this.http.put<Supplier>(`${this.apiUrl}/${id}`, supplier).pipe(
            catchError(this.handleError)
        );
    }

    deleteSupplier(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            tap(() => console.log(`🗑️ Supprimé: ${id}`)),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let message = 'Une erreur est survenue';
        if (error.status === 404) message = 'Fournisseur non trouvé';
        else if (error.status === 409) message = 'Ce fournisseur existe déjà';
        else if (error.status === 401) message = 'Non autorisé';

        console.error('❌ Erreur Service:', message);
        return throwError(() => new Error(message));
    }
}
