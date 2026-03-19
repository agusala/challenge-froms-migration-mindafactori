import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Automotor } from '../models/automotor.model';

@Injectable({ providedIn: 'root' })
export class AutomotorService {
  private apiUrl = 'http://localhost:3000/api/automotores'; // ajustar según entorno

  constructor(private http: HttpClient) {}

  getAll(): Observable<Automotor[]> {
    return this.http.get<Automotor[]>(this.apiUrl);
  }

  getByDominio(dominio: string): Observable<Automotor> {
    return this.http.get<Automotor>(`${this.apiUrl}/${dominio}`);
  }

  create(data: Automotor): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(dominio: string, data: Automotor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${dominio}`, data);
  }

  delete(dominio: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${dominio}`);
  }
}