import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sujeto } from '../models/sujeto.model';

@Injectable({ providedIn: 'root' })
export class SujetoService {
  private apiUrl = 'http://localhost:3000/api/sujetos';

  constructor(private http: HttpClient) {}

  findByCuit(cuit: string): Observable<Sujeto> {
    return this.http.get<Sujeto>(`${this.apiUrl}/by-cuit`, { params: { cuit } });
  }

  create(data: { cuit: string; denominacion: string }): Observable<Sujeto> {
    return this.http.post<Sujeto>(this.apiUrl, data);
  }
}