import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import {Dailycases} from "../interfaces/dailycases";
import {DailycasesService} from "../services/dailycases.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns = ['stateName', 'caseCount', 'cured', 'death'];
  covidData: Dailycases[] =[];
  constructor(private formBuilder: FormBuilder, private router: Router, private dailyCaseService: DailycasesService) { }

  ngOnInit(): void {
    this.dailyCaseService.getDailyCases().subscribe((data: any[])=>{
      this.covidData = data;
    })


    console.log(this.covidData );
  }

}
