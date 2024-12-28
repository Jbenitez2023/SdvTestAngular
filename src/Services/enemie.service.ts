import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api-response.model';
import { Person } from '../Models/Person.model';

@Injectable({
  providedIn: 'root',
})
export class EnemiesService {
  private baseUrl = 'http://sdvb.azurewebsites.net/api/EnemiesAPI';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`);
  }

  create(person: Person ): Observable<Response> {
    return this.http.post<Response>(this.baseUrl, person);
  }

  update(person: any): Observable<any> {
    return this.http.put<Response>(this.baseUrl, person);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
