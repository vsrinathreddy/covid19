import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateserviceService {
  private baseUrl = 'https://covid19service.azurewebsites.net/api/states';
  constructor(private http: HttpClient) { }

  public getStates(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
