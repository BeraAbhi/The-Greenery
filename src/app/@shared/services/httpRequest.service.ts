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

    public removeNullFromData(data:any){
      let afterRemoveData = data.filter((res:any) => res !== null)
      return afterRemoveData
    }

      reciveProduct(){
        return this.http.get<product>("https://the-greenery-7244f-default-rtdb.firebaseio.com/products.json")
      }
      addProduct(data:product){
        return this.http.post<product>("https://the-greenery-7244f-default-rtdb.firebaseio.com/products.json",data)
      }
      deleteProduct(index:number){
        return this.http.delete<product>("https://the-greenery-7244f-default-rtdb.firebaseio.com/products"+index+"/.json")
      }
      reciveProductWithId(index:number){
        return this.http.get<product>("https://the-greenery-7244f-default-rtdb.firebaseio.com/products/"+index+"/.json")
      }
      updateProductWithId(index:number,data:product){
        return this.http.put<product>("https://the-greenery-7244f-default-rtdb.firebaseio.com/products/"+index+"/.json",data)
      }
  
      //cart
      addRemovedNulldataInCart(data:any){
        return this.http.post("https://the-greenery-7244f-default-rtdb.firebaseio.com/cart.json",data)
      }
      pushInCart(data:any){
        return this.http.put<any>("https://the-greenery-7244f-default-rtdb.firebaseio.com/cart.json",data)
      }
      
      getDataFromCart(){
        return this.http.get<cart>("https://the-greenery-7244f-default-rtdb.firebaseio.com/cart.json")
      }
      
      deleteCartProduct(index:number){
        return this.http.delete<cart>("https://the-greenery-7244f-default-rtdb.firebaseio.com/cart/"+index+"/.json")
      }
  
      updateCartData(index:any,data:any){
        debugger
       return  this.http.put<any>("https://the-greenery-7244f-default-rtdb.firebaseio.com/cart/"+index+"/.json",data)
      }
}