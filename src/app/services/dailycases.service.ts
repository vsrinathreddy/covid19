import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailycasesService {
  private baseUrl = 'https://covid19service.azurewebsites.net/api/dailycases';
  constructor(private http: HttpClient) { }

  public getDailyCases(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
