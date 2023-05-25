import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { registraionservice } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formData!: FormGroup;
  apiData: any;
  radiooptions = ['Customer', 'Admin'];
  
  constructor(private http: HttpClient,
    private registrationService1: registraionservice,
    private router: Router,
    private readonly fb:FormBuilder) { }

  ngOnInit(): void {
    this.formData =this.fb.group({
      'firstName': new FormControl(null, Validators.required),
      // 'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required),
      'userType': new FormControl('user'),
    },
    {
      validator: this.ConfirmPasswordValidator("password","confirmPassword")
    }
    )
    this.registrationService1.reciveData().subscribe((data: any) => {
      this.apiData = data
    })
  }
  private ConfirmPasswordValidator(controlName:any, matchingControlName:any) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmPasswordValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public onSubmit():void { 
      if(this.apiData.find((serachEmail: any)=> serachEmail.email === this.formData.get('email')?.value)){
        alert('email is already register')
    }
    else{
        this.registrationService1.register(this.formData.value).subscribe()
        this.router.navigate(['./login'])
    }
   }
}
