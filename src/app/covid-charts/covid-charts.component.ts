import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { States } from "../interfaces/states";
import { StateserviceService } from "../services/stateservice.service";
import { MediaMatcher } from '@angular/cdk/layout';
import { Charts } from "../interfaces/charts";
import { ChartsService } from "../services/charts.service";
import { DatePipe } from '@angular/common';
import { ICounter } from "../interfaces/i-Counter";

@Component({
  selector: 'app-covid-charts',
  templateUrl: './covid-charts.component.html',
  styleUrls: ['./covid-charts.component.css']
})
export class CovidChartsComponent implements OnInit {
  chartsFormGroup: FormGroup;
  post: any = '';
  error: string = '';
  states: States[] = [];
  dynamicResize:boolean= true;

  type = 'ColumnChart';
  pietype = 'PieChart';

  chartPieData = [];
  chartTotalData = [];
  chartCuredData = [];
  chartDeathData = [];

  piecolumnNames = ['Type', 'Percentage'];
  curedcolumnNames = ['Date', 'Cured'];
  deathcolumnNames = ['Date', 'Death'];
  totalcolumnNames = ['Date', 'Total Cases'];

  totaloptions = {
    title: 'Confirmed Cases of last 21 days',
    animation: {
      duration: 2000,
      easing: 'linear',
      startup: true
    },
    colors: ['purple']
  };

  curedoptions = {
    title: 'Cured Cases of last 21 days',
    animation: {
      duration: 2000,
      easing: 'linear',
      startup: true
    },
    colors: ['green']
  };

  deathoptions = {
    title: 'Death Cases of last 21 days',
    animation: {
      duration: 2000,
      easing: 'linear',
      startup: true
    },
    colors: ['red']
  };

  pieoptions = {
    title: 'Total Percentage of Cases',
    is3D: true,
    colors: ['orange', 'green', 'red']
  };

  width = '50vh';
  height = 500;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  steps: number;
  @ViewChild("animatedTotal") animatedTotal: ElementRef;
  @ViewChild("animatedActive") animatedActive: ElementRef;
  @ViewChild("animatedCured") animatedCured: ElementRef;
  @ViewChild("animatedDeath") animatedDeath: ElementRef;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private formBuilder: FormBuilder, private router: Router, public datepipe: DatePipe,
    private stateService: StateserviceService, private chartsService: ChartsService) { }

  ngOnInit(): void {

    this.createForm();
    this.stateService.getStates().subscribe((data: any[]) => {
      this.states = data;
    });
    this.onStateSelect();

  }

  createForm() {
    this.chartsFormGroup = this.formBuilder.group({
      'stateControl': ['0'],
      'reporttypecontrol': ['0']
    });
    this.chartsFormGroup.controls['stateControl'].setValue(0);
    this.chartsFormGroup.controls['reporttypecontrol'].setValue(0);
  }

  onStateSelect() {
    this.chartsService.getCountersList('All', this.chartsFormGroup.get('stateControl').value).subscribe((data: any[]) => {
      this.setCounter(data);
      this.chartPieData = this.setPieData(data);
    });
    this.chartsService.getChartsList('Daily', this.chartsFormGroup.get('stateControl').value).subscribe((data: any[]) => {
      this.chartTotalData = this.convertJsonToArray(data, 'Total');
      this.chartCuredData = this.convertJsonToArray(data, 'Cured');
      this.chartDeathData = this.convertJsonToArray(data, 'Death');
    });
  }

  onReportSelect() {
    let reporttype: string;
    if(this.chartsFormGroup.get('reporttypecontrol').value==0){
      reporttype='Daily';
    }
    else{
      reporttype='Cummulative';
    }

    //this.chartsService.getCountersList('All', this.chartsFormGroup.get('stateControl').value).subscribe((data: any[]) => {
      //this.setCounter(data);
     // this.chartPieData = this.setPieData(data);
   // });
    this.chartsService.getChartsList(reporttype, this.chartsFormGroup.get('stateControl').value).subscribe((data: any[]) => {
      this.chartTotalData = this.convertJsonToArray(data, 'Total');
      this.chartCuredData = this.convertJsonToArray(data, 'Cured');
      this.chartDeathData = this.convertJsonToArray(data, 'Death');
    });
  }

  setPieData(inputData: ICounter[]) {
    let finalArray = [];
    for (let item of inputData) {
      let array = [];
      array.push('Active', item.activeCases);
      finalArray.push(array);
      array = [];
      array.push('Cured', item.totalCured);
      finalArray.push(array);
      array = [];
      array.push('Death', item.totalDeath);
      finalArray.push(array);

    }
    return finalArray;
  }
  setCounter(inputData: ICounter[]) {

    let duration: number = 2000;
    if (this.chartsFormGroup.get('stateControl').value != 0) {
      duration = 1000;
    }
    else {
      duration = 2000;
    }
    for (let item of inputData) {

      this.chartsService.animateCount(item.totalCount, duration, this.animatedTotal);
      this.chartsService.animateCount(item.activeCases, duration, this.animatedActive);
      this.chartsService.animateCount(item.totalCured, duration, this.animatedCured);
      this.chartsService.animateCount(item.totalDeath, duration, this.animatedDeath);
    }
  }


  convertJsonToArray(inputData: Charts[], type: string) {
    let finalArray = [];
    for (let item of inputData) {
      let array = [];
      if (type == 'Total') {
        array.push(this.formatDate(item.createdDate.toString()), item.totalCount);
      }
      else if (type == 'Cured') {
        array.push(this.formatDate(item.createdDate.toString()), item.totalCured);
      }
      else if (type == 'Death') {
        array.push(this.formatDate(item.createdDate.toString()), item.totalDeath);
      }
      finalArray.push(array);
    }
    return finalArray;
  }


  formatDate(date: string) {
    return this.datepipe.transform(date, 'dd-MMM');
  }
}
