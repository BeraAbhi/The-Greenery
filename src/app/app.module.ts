import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { RegisterComponent } from './@auth/register/register.component';
import { LoginComponent } from './@auth/login/login.component';
import { DashboardComponent } from './@shared/component/dashboard/dashboard.component';
import { HeaderComponent } from './@shared/component/header/header.component';
import { appRouting } from './app-routing.module';
import { authGuard } from './@auth/services/auth.guard.service';
import { CartComponent } from './@shared/component/cart/cart.component';
import { EditProductComponent } from './@shared/component/edit-product/edit-product.component';
import { Guard } from './@shared/services/guard.service';
import { PagenotfoundComponent } from './@shared/component/pagenotfound/pagenotfound.component';
import { ProductDetailComponent } from './@shared/component/product-detail/product-detail.component';
import { LoadingSpinnerComponent } from './@shared/component/loading-spinner/loading-spinner.component';
import { AdminDashboardComponent } from './@shared/component/adminPanel/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    CartComponent,
    EditProductComponent,
    PagenotfoundComponent,
    ProductDetailComponent,
    LoadingSpinnerComponent,
    AdminDashboardComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    appRouting,
    FormsModule
  ],
  providers: [authGuard,Guard],
  bootstrap: [AppComponent],
})
export class AppModule { }
