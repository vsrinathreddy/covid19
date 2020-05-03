import { Component, OnInit, ViewChild,AfterViewInit,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { Dailycases } from "../interfaces/dailycases";
import { DailycasesService } from "../services/dailycases.service";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartsService } from "../services/charts.service";
import { ICounter } from "../interfaces/i-Counter";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns = ['stateName', 'caseCount', 'cured', 'death'];
  dataSource: MatTableDataSource<Dailycases>;
  dailyCases: Dailycases[] = [];

  @ViewChild(MatSort) sort: MatSort;
  date = new Date();
  steps: number;
  @ViewChild("animatedTotal") animatedTotal: ElementRef;
  @ViewChild("animatedActive") animatedActive: ElementRef;
  @ViewChild("animatedCured") animatedCured: ElementRef;
  @ViewChild("animatedDeath") animatedDeath: ElementRef;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private dailyCaseService: DailycasesService,private chartsService: ChartsService) {
    }

  ngOnInit(): void {
    this.dailyCaseService.getDailyCases().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dailyCases = data;
    });
    this.chartsService.getCountersList('All',0).subscribe((data: any[]) => {
      this.setCounter(data);
    });
  }

  setCounter(inputData: ICounter[]){
    for(let item of inputData){
      this.animateCount(item.totalCount, 2000,this.animatedTotal);
      this.animateCount(item.activeCases, 2000,this.animatedActive);
      this.animateCount(item.totalCured, 2000,this.animatedCured);
      this.animateCount(item.totalDeath, 2000,this.animatedDeath);
    }
  }

  animateCount(endValue, durationMs,element) {
    if (!this.steps) {
      this.steps = 12;
    }

    const stepCount = Math.abs(durationMs / this.steps);
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

  getTotalCases(type: number) {
    if (type == 1) {
      return this.dailyCases.map(t => t.caseCount).reduce((acc, value) => acc + value, 0);
    }
    else if (type == 2) {
      return this.dailyCases.map(t => t.cured).reduce((acc, value) => acc + value, 0);
    }
    else {
      return this.dailyCases.map(t => t.death).reduce((acc, value) => acc + value, 0);
    }
  }

}
