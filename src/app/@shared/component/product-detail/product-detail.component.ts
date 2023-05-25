import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, httpRequest, product } from '../../services/httpRequest.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productDetail:product | undefined;
  localstorageLoginData: any ;
  cartArr:any;
  productQuantity=1;
  productImage:any

  constructor(private route: ActivatedRoute,
    private  httpRequest:httpRequest,
    private readonly router:Router) { }
    
  ngOnInit(): void {

    let id = this.route.snapshot.params['id']
    debugger
    this.httpRequest.reciveProductWithId(id).subscribe(res => {
      this.productDetail=res
      this.productImage=res.productImage

    })
    if(localStorage.length >= 1) {
      this.localstorageLoginData = JSON.parse(localStorage.getItem("loginData") || '');
      }
  }

  AddToCart(val:any){
    this.cartArr =  
    {
      "productName": this.productDetail?.productName,
      "productImage": this.productDetail?.productImage,
      "productPrice": this.productDetail?.productPrice,
      "productQuantity": this.productQuantity,
      "userName": this.localstorageLoginData.firstName,
    }

    this.httpRequest.getDataFromCart().subscribe((res:any)=>{
      let cartdata = res
      let index = res.findIndex((data:any)=> data.productName === this.productDetail?.productName && this.productDetail?.productName && data.userName === this.localstorageLoginData.firstName)
      if(index === -1){
        this.httpRequest.pushInCart(this.cartArr).subscribe();
      }
      else{
        this.cartArr.productQuantity = Number(res[index].productQuantity) + Number(this.productQuantity)
        this.httpRequest.updateCartData(res[index].id,this.cartArr).subscribe();
        this.router.navigate(['/cart'])
      }
    })
  }

  onplus(val: any){
    this.productQuantity=Number(val)+1
  }

  onMinus(val:any){
    debugger
    if(Number(val)!==1){
    this.productQuantity=Number(val)-1
    }
  }

  onChangeImage(val:any){
    this.productImage=val
  }
}
