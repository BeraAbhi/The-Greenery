import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { pipe, Subject } from "rxjs";

export interface product{
  productName:string,
  productImage: string,
  productType: string,
  productPrice: number,
  productDescription:string,
  productBotanicalName:string,
}
export interface cart{
  productName: string,
  productImage: string,
  productPrice: number,
  productQuantity: number,
  userName: string,
}

@Injectable({providedIn:'root'})
export class httpRequest{

    cartCount = new Subject<any>();
    searchText= new Subject<any>();
    
    constructor(private http:HttpClient){}

      reciveProduct(){
        return this.http.get<product>("http://localhost:3000/products")
      }
      addProduct(data:product){
        return this.http.post<product>("http://localhost:3000/products",data)
      }
      deleteProduct(index:number){
        return this.http.delete<product>("http://localhost:3000/products/"+index)
      }
      reciveProductWithId(index:number){
        return this.http.get<product>("http://localhost:3000/products/"+index)
      }
      updateProductWithId(index:number,data:product){
        return this.http.put<product>("http://localhost:3000/products/"+index,data)
      }
  
      pushInCart(data:cart){
        return this.http.post<cart>("http://localhost:3000/cart",data)
      }
      
      getDataFromCart(){
        return this.http.get<cart>("http://localhost:3000/cart")
      }
      
      deleteCartProduct(index:number){
        return this.http.delete<cart>("http://localhost:3000/cart/"+index)
      }
  
      updateCartData(index:any,data:any){
       return  this.http.put<cart>("http://localhost:3000/cart/"+index,data)
      }
}