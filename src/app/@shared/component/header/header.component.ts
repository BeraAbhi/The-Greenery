import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, pipe } from 'rxjs';
import { registraionservice } from 'src/app/@auth/services/auth.service';
import { httpRequest } from '../../services/httpRequest.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  noLoginFound = false;
  countNumber = 0;
  nologin:any;
  localUserType : any;
  localstorageLoginData:any;
  filterData:any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private httpRequest:httpRequest) { }

  ngOnInit(): void {
    if (localStorage.length === 0) {
      this.noLoginFound = true
    }
    if(localStorage.length >= 1){
    let userType = (JSON.parse(localStorage.getItem("loginData") || ''))
    if(userType.userType==='Admin'){
      this.localUserType=true;
    }
    else{
      this.localUserType=false;
    }
    this.httpRequest.cartCount.subscribe((res:any) =>
    this.countNumber=res
    )
    this.localstorageLoginData = JSON.parse(localStorage.getItem("loginData") || '');
    this.httpRequest.getDataFromCart().subscribe((res:any)=>{
     this.countNumber= res.filter((data:any)=> data.userName === this.localstorageLoginData.firstName).length;
    })
  }
}

  public onLogout() {
    localStorage.clear()
    this.router.navigate(['/login'], { relativeTo: this.route })
  }
  onAddProduct(){
    this.router.navigate(['/editProduct'])
  }

  onsubmit(f:any){
    this.httpRequest.searchText.next(f.value)
  }
}
