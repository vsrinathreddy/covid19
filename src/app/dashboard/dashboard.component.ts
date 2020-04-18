import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import {Dailycases} from "../interfaces/dailycases";
import {DailycasesService} from "../services/dailycases.service";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns = ['stateName', 'caseCount', 'cured', 'death'];
  dataSource: MatTableDataSource<Dailycases>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private router: Router, private dailyCaseService: DailycasesService) { }

  ngOnInit(): void {
    this.dailyCaseService.getDailyCases().subscribe((data: any[])=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })

  }

}
