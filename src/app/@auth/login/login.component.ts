import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { registraionservice } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData!: FormGroup;
  matched = false;
  getRequest: any;
  apiData: any;

  constructor(
    private registrationService1: registraionservice,
    private router: Router,
    private Route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRequest = this.registrationService1
      .reciveData()
      .subscribe((data: any) => {});
    this.loginData = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
    this.registrationService1.reciveData().subscribe((data: any) => {
      this.apiData = data;
    });
  }

  onSubmitData() {
    let userData = this.apiData?.find(
      (matchData: any) =>
        matchData.email === this.loginData.get('email')?.value &&
        matchData.password === this.loginData.get('password')?.value
    );
    if (userData) {
      this.matched = true;
      localStorage.setItem('loginData', JSON.stringify(userData));
      this.router.navigate(['/dashboard'], { relativeTo: this.Route });
    } else {
      this.loginData?.setErrors({ 'both is invalid': true });
      this.matched = false;
    }
  }
}
