import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class WeaponService {
  private baseUrl = 'http://localhost:8000/api/WeaponsAPI';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`);
  }

  create(weapon: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, weapon);
  }

  update(weapon: any): Observable<any> {
    return this.http.put<any>(this.baseUrl, weapon);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
