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
  public getCountersList(type: string,stateID: number): Observable<any> {

    return this.http.get(this.baseUrl + 'CounterList?type=' +type + '&&stateID=' +stateID);
  }

  public animateCount(endValue, durationMs,element) {
   // if (!this.steps) {
      //this.steps = 12;
   // }

    const stepCount = Math.abs(durationMs / 12);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    function step() {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

      element.nativeElement.textContent = Math.abs(Math.floor(currentValue));


      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      }
    }

    step();
  }
}
