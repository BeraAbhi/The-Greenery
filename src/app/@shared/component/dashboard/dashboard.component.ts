import { Component, ElementRef, OnInit, Output, Renderer2 } from '@angular/core';
import { Route, Router } from '@angular/router';
import { findIndex, Subject } from 'rxjs';
import { registraionservice } from 'src/app/@auth/services/auth.service';
import { httpRequest } from '../../services/httpRequest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productApiData: any;
  cartArr: any;
  cartApiData: any;
  localstorageLoginData: any ;
  noData:number = 0;
  ABC=''
  loadindSpinner:boolean=true

  constructor(private router: Router, private registraionservice: registraionservice,
    private httpRequest: httpRequest,private render:Renderer2) { }

  ngOnInit(): void {
    debugger
    if(localStorage.getItem("loginData")?.length === 0 || localStorage.getItem("loginData") === null){
      alert('please login to buy a product')
    }
    this.noData = localStorage.length
    this.httpRequest.searchText.subscribe(res=>{
      this.ABC=res
    })
    if(localStorage.length>=1){
    this.httpRequest.reciveProduct().subscribe((data: any) => {
      this.loadindSpinner=false
      debugger
      data.productImage
      this.productApiData = data; 
    })
  }
    if(localStorage.length >= 1) {
    this.localstorageLoginData = JSON.parse(localStorage.getItem("loginData") || '');
    }


  //   let a:any=[1,5,6,8,8,8,8,4,3,5,2,5,2,7,8,9,9,10,10
  //   ]
  //   debugger
  //   for(let i=0;i<=a.length;i++){
  //     if(a[i] === a[i+1]){
  //       a.splice(i, 1);
  //       if(a[i] === a[i-1]){
  //         a.splice(i,i-1,1)
  //       }
  //     }
  // }
  // console.log(a);
  
  }


  getProductData() {
    this.httpRequest.reciveProduct().subscribe((data: any) => {
      this.productApiData = data
    })
  }

  onCart(productId: any) {
    this.cartArr =
    {
      "id":Number,
      "productName": productId.productName,
      "productImage": productId.productImage,
      "productPrice": productId.productPrice,
      "productQuantity": 1,
      "userName": this.localstorageLoginData.firstName
    }
  

    this.httpRequest.getDataFromCart().subscribe((data: any) => {
      debugger
      this.cartApiData = data
      let userSpecificCartItem=data.filter((data:any)=> data.userName === this.localstorageLoginData.firstName)

      if (data.length !== 0) {
        let index = this.cartApiData.findIndex((matchItem: any) => matchItem.productName === this.cartArr.productName && matchItem.userName === this.cartArr.userName)
        if (index !== -1) {
          this.cartArr['productQuantity'] = this.cartApiData[index].productQuantity + 1;
          this.httpRequest.updateCartData(index, this.cartArr).subscribe()
        }
        else {
          this.cartArr['id'] = data.length+1
          data.push(this.cartArr)
          this.httpRequest.cartCount.next(userSpecificCartItem.length + 1)
          this.httpRequest.pushInCart(data).subscribe();
        }
      }
      else {
        this.cartArr['id'] = data.length+1
        data.push(this.cartArr)
        this.httpRequest.cartCount.next(userSpecificCartItem.length + 1)
        this.httpRequest.pushInCart(data).subscribe();
      }
    })
  }

  onDeleteProduct(data: any) {
    this.httpRequest.deleteProduct(data.id).subscribe();
    this.getProductData()
  }
  onProductEdit(data: any) {
    this.router.navigate(['/editProduct', data.id])
  }

  onChangeProductList(val:string,b?:HTMLElement){
    if(localStorage.getItem("loginData")?.length === 0 || localStorage.getItem("loginData") === null){
      alert('please login to buy a product')
    }
    else{
      if(val===''){
          this.httpRequest.reciveProduct().subscribe(res=>{
          this.productApiData=res
        })
      }
      else{
          this.httpRequest.reciveProduct().subscribe((res:any)=>{
          this.productApiData = res.filter((res:any) => res.productType === val)
       })
      }
    }
  }
  

 
}
