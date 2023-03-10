import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from './auth.guard';
import { DetailsProductComponent } from './components/details-product/details-product.component';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {
    path: 'products',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProductsComponent },
      { path: ':id', component: DetailsProductComponent },
      { path: ':id/edit', component: EditComponent },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule],
})
export class ProductModule {}
