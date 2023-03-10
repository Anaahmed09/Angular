import { IProduct } from './../../model/iproduct';
import { ProductService } from './../../services/product.service';
import { Component, NgIterable, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getAllProducts.subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        throw Error(error);
      },
    });
  }
  deleteProduct(id: number) {
    this.productService.deleteProductById(id).subscribe({
      next: (response) => {
        this.products = this.products.filter((product: any) => product.id != id);
      },
    });
  }
}
