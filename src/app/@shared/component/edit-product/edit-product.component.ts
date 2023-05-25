import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { httpRequest } from '../../services/httpRequest.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private httpRequest: httpRequest) { }

  editProductForm!: FormGroup;
  indexOfEditProduct: any;
  editProductApiData: any;

  ngOnInit(): void {
    this.indexOfEditProduct = this.route.snapshot.params['id']
    if (this.indexOfEditProduct === undefined) {
    } else {
      this.httpRequest.reciveProductWithId(this.indexOfEditProduct).subscribe((res: any) => {
        this.editProductApiData = res
        this.editProductForm.patchValue({
          productName: this.editProductApiData.productName,
          productImage: this.editProductApiData.productImage,
          productType: this.editProductApiData.productType,
          productPrice: this.editProductApiData.productPrice,
          productDescription: this.editProductApiData.productDescription,
          productBotanicalName: this.editProductApiData.productBotanicalName,
        });
      }
      )
    }
    this.editProductForm = new FormGroup({
      'productName': new FormControl(null, Validators.required),
      'productImage': new FormControl(null, Validators.required),
      'productType': new FormControl(null, Validators.required),
      'productPrice': new FormControl(null, Validators.required),
      'productDescription': new FormControl(null, Validators.required),
      'productBotanicalName': new FormControl(null, Validators.required)
    }
    )
  }

  onSubmit() {
    if (this.indexOfEditProduct === undefined) {
      this.httpRequest.addProduct(this.editProductForm.value).subscribe();
      this.router.navigate(['/dashboard'])
    } else {
      this.httpRequest.updateProductWithId(this.indexOfEditProduct, this.editProductForm.value).subscribe()
      this.router.navigate(['/dashboard'])
    }
  }
  cancle() {
    this.router.navigate(['/dashboard'])
  }
}
