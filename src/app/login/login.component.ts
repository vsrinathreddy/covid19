import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  post: any = '';
  error: string = '';

  constructor(private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginFormGroup = this.formBuilder.group({
      'user': ['', Validators.required],
      'pass': ['', Validators.required]
    });
  }

  onSubmit(post) {
    this.post = post;
    if(this.loginFormGroup.get('user').value != "" && this.loginFormGroup.get('pass').value != ""){
      if(this.loginFormGroup.get('user').value == "admin" && this.loginFormGroup.get('pass').value == "@pple3191")
      {
        this.error='';
        this.router.navigate(['/cases']);
      }
      else {
        this.error='User Name or Password is Invalid';
      }
    }

  }
}
