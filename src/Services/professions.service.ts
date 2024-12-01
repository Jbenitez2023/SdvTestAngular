import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessionService {
  private baseUrl = 'http://localhost:8000/api/ProfessionAPI';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`);
  }

  create(profession: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, profession);
  }

  update(profession: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl, profession);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`);
  }
}
