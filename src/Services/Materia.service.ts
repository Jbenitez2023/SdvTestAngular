import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api-response.model';
import { Materia } from '../Models/Materia.models';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {
  private baseUrl = 'http://localhost:8000/api/MateriaAPI';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`);
  }

  create(materia: Materia ): Observable<Response> {
    return this.http.post<Response>(this.baseUrl, materia);
  }

  update(materia: Materia): Observable<any> {
    return this.http.put<Response>(this.baseUrl, materia);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}