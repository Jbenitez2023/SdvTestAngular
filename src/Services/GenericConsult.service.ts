import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api-response.model';
import { Person } from '../Models/Person.model';

@Injectable({
  providedIn: 'root',
})
export class GenericConsultService {
  public baseUrl = '';

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/${id}`);
  }
}
