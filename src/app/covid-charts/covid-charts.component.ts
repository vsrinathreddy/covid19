import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { States } from "../interfaces/states";
import { StateserviceService } from "../services/stateservice.service";
import { MediaMatcher } from '@angular/cdk/layout';
import { Charts } from "../interfaces/charts";
import { ChartsService } from "../services/charts.service";
import { DatePipe } from '@angular/common';

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
  chartsData: Charts[] = [];

  title = 'Daily Cases';
  type = 'BarChart';
  chartFinalData = [];
  columnNames = ['Date', 'Total Cases'];
  options = {animation:{
    duration: 2000,
    easing: 'linear',
    startup: true
  }};
  width = '50%';
  height = 500;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private formBuilder: FormBuilder, private router: Router, public datepipe: DatePipe,
    private stateService: StateserviceService, private chartsService: ChartsService) { }

  ngOnInit(): void {

    this.createForm();
    this.stateService.getStates().subscribe((data: any[]) => {
      this.states = data;
    });
    this.onStateSelect() ;
  }

  createForm() {
    this.chartsFormGroup = this.formBuilder.group({
      'stateControl': ['0']
    });
    this.chartsFormGroup.controls['stateControl'].setValue(0);
  }

  onStateSelect() {
    this.chartsService.getChartsList('All', this.chartsFormGroup.get('stateControl').value).subscribe((data: any[]) => {
      this.chartFinalData = this.convertJsonToArray(data);

    });
  }
  formatDate(date: string) {
    return this.datepipe.transform(date, 'dd-MMM-yyyy');
  }

  convertJsonToArray(inputData: Charts[]) {
    let finalArray = [];
    for(let item of inputData){
      let array = [];
      array.push(this.formatDate(item.createdDate.toString()), item.totalCount);
      finalArray.push(array);
    }
    return finalArray;
  }


}
