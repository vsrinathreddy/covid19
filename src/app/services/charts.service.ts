import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private baseUrl = 'https://covid19service.azurewebsites.net/api/charts/';
  constructor(private http: HttpClient) { }

  public getChartsList(type: string,stateID: number): Observable<any> {

    return this.http.get(this.baseUrl + 'ChartList?type=' +type + '&&stateID=' +stateID);
  }
}
