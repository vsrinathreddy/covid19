import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import { States } from "../interfaces/states";
import { StateserviceService } from "../services/stateservice.service";
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dailycases } from "../interfaces/dailycases";
import { DailycasesService } from "../services/dailycases.service";
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-case-entry',
  templateUrl: './case-entry.component.html',
  styleUrls: ['./case-entry.component.css']
})

export class CaseEntryComponent implements OnInit {
  caseFormGroup: FormGroup;
  post: any = '';
  error: string = '';
  states: States[] = [];
  displayedColumns = ['caseDate','stateName', 'caseCount', 'cured', 'death'];
  dataSource: MatTableDataSource<Dailycases>;
  dailyCases: Dailycases[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private formBuilder: FormBuilder, private router: Router, public datepipe: DatePipe,
    private stateService: StateserviceService, private dailyCaseService: DailycasesService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.createForm();
    this.stateService.getStates().subscribe((data: any[]) => {
      this.states = data;
    });
    this.dailyCaseService.getAllDailyCases(this.formatDate(this.caseFormGroup.get('date').value), this.caseFormGroup.get('stateControl').value).subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dailyCases = data;
      this.dataSource.paginator = this.paginator;
    });

  }

  createForm() {
    this.caseFormGroup = this.formBuilder.group({
      'date': [''],
      'stateControl': ['0']
    });
    this.caseFormGroup.controls['stateControl'].setValue(0);
  }

  onSubmit(post) {
    this.post = post;
    this.dailyCaseService.getAllDailyCases(this.formatDate(this.caseFormGroup.get('date').value), this.caseFormGroup.get('stateControl').value).subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dailyCases = data;
      this.dataSource.paginator = this.paginator;
    });

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

  formatDate(date: string) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

}
