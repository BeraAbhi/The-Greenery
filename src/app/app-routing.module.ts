import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "./@auth/services/auth.guard.service";
import { LoginComponent } from "./@auth/login/login.component";
import { RegisterComponent } from "./@auth/register/register.component";
import { DashboardComponent } from "./@shared/component/dashboard/dashboard.component";
import { HeaderComponent } from "./@shared/component/header/header.component";
import { CartComponent } from "./@shared/component/cart/cart.component";
import { EditProductComponent } from "./@shared/component/edit-product/edit-product.component";
import { Guard } from "./@shared/services/guard.service";
import { PagenotfoundComponent } from "./@shared/component/pagenotfound/pagenotfound.component";
import { ProductDetailComponent } from "./@shared/component/product-detail/product-detail.component";
import { AdminDashboardComponent } from "./@shared/component/adminPanel/admin-dashboard/admin-dashboard.component";


const appRoute:Routes=[
    {path:'registration',component:RegisterComponent},
    {path:'login',component:LoginComponent,canActivate:[authGuard]},
    {path:'',component:DashboardComponent},
    {path:'nav-bar',component:HeaderComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'cart',component:CartComponent},
    {path: 'editProduct',component:EditProductComponent,canActivate:[Guard]},
    {path: 'editProduct/:id',component:EditProductComponent,canActivate:[Guard]},
    {path: 'product-detail/:id',component:ProductDetailComponent},
    {path:'admin-panel',component:AdminDashboardComponent},
    {path:'**',component:PagenotfoundComponent}
]
@NgModule({
    imports:[RouterModule.forRoot(appRoute)],
    exports:[RouterModule]
})
export class appRouting{}