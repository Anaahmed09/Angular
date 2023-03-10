import { ProductService } from './../../services/product.service';
import { IProduct } from './../../model/iproduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css'],
})
export class DetailsProductComponent implements OnInit {
  product: any;
  id: number = 0;
  constructor(private ProductService: ProductService,private activeRoute: ActivatedRoute) {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.ProductService.getProductById(this.id).subscribe({
      next:(response) => {
        this.product = response;
      }
    });
  }
}
