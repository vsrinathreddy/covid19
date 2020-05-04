import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormBuilder} from '@angular/forms';
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
  displayedColumns = ['stateName', 'caseCount', 'activeCases','cured', 'death'];
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
      this.chartsService.animateCount(item.totalCount, 2000,this.animatedTotal);
      this.chartsService.animateCount(item.activeCases, 2000,this.animatedActive);
      this.chartsService.animateCount(item.totalCured, 2000,this.animatedCured);
      this.chartsService.animateCount(item.totalDeath, 2000,this.animatedDeath);
    }
  }

  getTotalCases(type: number) {
    if (type == 1) {
      return this.dailyCases.map(t => t.caseCount).reduce((acc, value) => acc + value, 0);
    }
    else if (type == 2) {
      return this.dailyCases.map(t => t.cured).reduce((acc, value) => acc + value, 0);
    }
    else if (type == 3) {
      return this.dailyCases.map(t => t.death).reduce((acc, value) => acc + value, 0);
    }
    else {
      return this.dailyCases.map(t => t.activeCases).reduce((acc, value) => acc + value, 0);
    }
  }

}
