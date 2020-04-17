import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router"
interface States {
  ID: string;
  Name: string;
}
@Component({
  selector: 'app-case-entry',
  templateUrl: './case-entry.component.html',
  styleUrls: ['./case-entry.component.css']
})
export class CaseEntryComponent implements OnInit {
  caseFormGroup: FormGroup;
  post: any = '';
  error: string = '';
  states: States[] = [
    {ID: 'steak-0', Name: 'Andhra'},
    {ID: 'pizza-1', Name: 'Telangana'},
    {ID: 'tacos-2', Name: 'Kerala'}
  ];
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
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
