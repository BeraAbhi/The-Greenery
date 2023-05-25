import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"

interface register{
  firstName:string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword:string,
  userType: string
  }

@Injectable({ providedIn: 'root' })
export class registraionservice {
  

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post<register>('http://localhost:3000/registrationdata', data);
  }

  reciveData() {
    return this.http.get<register>('http://localhost:3000/registrationdata');
  }

}