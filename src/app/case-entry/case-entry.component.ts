import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router"
import {States} from "../interfaces/states";
import {StateserviceService} from "../services/stateservice.service";

@Component({
  selector: 'app-case-entry',
  templateUrl: './case-entry.component.html',
  styleUrls: ['./case-entry.component.css']
})

export class CaseEntryComponent implements OnInit {
  caseFormGroup: FormGroup;
  post: any = '';
  error: string = '';
  states: States[] =[];
  constructor(private formBuilder: FormBuilder, private router: Router, private stateService: StateserviceService) { }

  ngOnInit(): void {
    this.stateService.getStates().subscribe((data: any[])=>{
      console.log(data);
      this.states = data;
    })
    this.createForm();
  }

  createForm() {
    this.caseFormGroup = this.formBuilder.group({
      'date': ['', Validators.required],
      'stateControl': ['', Validators.required],
      'count': ['', Validators.required]
    });
  }

  onSubmit(post) {
    this.post = post;

    this.error = '';
    this.router.navigate(['/dashboard']);


  }
}
