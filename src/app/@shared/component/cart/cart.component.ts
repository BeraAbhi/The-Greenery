import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { findIndex, from, of, toArray } from 'rxjs';
import { registraionservice } from 'src/app/@auth/services/auth.service';
import { httpRequest } from '../../services/httpRequest.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  apiData: any;
  productQuantityTotal: [] = []
  totalPrice: any;
  apiDataToDisplay: any;
  localUserType: any;
  loadingSpinner!:boolean;
  mainLoadingSpinner=true;

  constructor(private http: HttpClient,
    private httpRequest: httpRequest,
    private router: Router,
    private cdf:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCartData()
    this.loadingSpinner=true
  }

  getCartData() {
    debugger
    this.localUserType = JSON.parse(localStorage.getItem('loginData') || '')
    this.httpRequest.getDataFromCart().subscribe((data: any) => {
      this.mainLoadingSpinner=false
      this.apiData = data
      let withOutNullData = this.httpRequest.removeNullFromData(data)
      let userCart = withOutNullData.filter((data: any) => data.userName === this.localUserType.firstName)
      this.apiDataToDisplay = userCart
      this.apiDataToDisplay = this.httpRequest.removeNullFromData(this.apiDataToDisplay)
      this.loadingSpinner=false
      this.onTotalPrice();
      this.onTotalQuantity();
    })
  }

  onTotalQuantity() {
    this.productQuantityTotal = this.apiDataToDisplay.reduce(function (acc: any, obj: any) 
    { return acc + obj.productQuantity; }, 0);
  }
  onTotalPrice() {
    this.totalPrice = this.apiDataToDisplay.reduce(function (acc: any, obj: any) {
      let xyz = obj.productQuantity;
      let ABC = xyz * obj.productPrice
      return acc + ABC
    }, 0);
  }

  onPlus(nameOfProduct: any) {
    debugger
    let index = this.apiData.findIndex((abcd: any) => abcd.productName === nameOfProduct && abcd.userName === this.localUserType.firstName)
    this.apiData[index].productQuantity = this.apiData[index].productQuantity + 1;
    this.loadingSpinner=true
    setTimeout(() => {
    this.httpRequest.updateCartData(index, this.apiData[index]).subscribe()
      }, 200);
      setTimeout(() => {
      this.getCartData();
      }, 1000);
      
      this.cdf.detectChanges();
  }

  onMinus(nameOfProduct: any) {
    debugger
    let index = this.apiData.findIndex((abcd: any) => abcd.productName === nameOfProduct && abcd.userName === this.localUserType.firstName)
    if (this.apiData[index].productQuantity === 1) {
      this.apiData[index].productQuantity = 1
    } else {
      this.loadingSpinner=true
      this.apiData[index].productQuantity = this.apiData[index].productQuantity - 1;
    }
    setTimeout(() => {
      this.httpRequest.updateCartData(index, this.apiData[index]).subscribe()
      }, 200);
      setTimeout(() => {
      this.getCartData();
      }, 1000);
      // this.cdf.detectChanges();
  }
  onPlaceOrder() {
      localStorage.setItem("order-item",JSON.stringify(this.apiDataToDisplay))
  } 

  onCartDeleteProduct(item: any) {
    debugger
    let index = this.apiData.findIndex((res:any) => res===item ) ;
    this.httpRequest.deleteCartProduct(index).subscribe((res:any) =>{
      this.loadingSpinner=true
    }
    )
    setTimeout(() => {
    this.getCartData();
    }, 2000);
  }

}


