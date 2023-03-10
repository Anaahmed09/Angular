import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  product: any = '';
  id: number = 0;
  messageError: boolean = false;
  productForm = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z]*$/i),
      Validators.minLength(2),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    img: new FormControl('',[Validators.required]),
  });
  ngOnInit(): void {
    if (this.id !== 0)
      this.productService.getProductById(this.id).subscribe({
        next: (response) => {
          this.product = response;
          this.productForm.controls['productName'].setValue(
            this.product.productName
          );
          this.productForm.controls['price'].setValue(this.product.price);
          this.productForm.controls['quantity'].setValue(this.product.quantity);
        },
        error: (error) => {
          throw Error(error);
        },
      });
  }
  get productName() {
    return this.productForm.controls['productName'];
  }
  get price() {
    return this.productForm.controls['price'];
  }
  get quantity() {
    return this.productForm.controls['quantity'];
  }

  selectedFile: File | any;
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  editProduct(e: Event) {
    e.preventDefault();
    if (this.productForm.status == 'VALID') {
      this.productForm.value.img = `assets/images/${this.selectedFile.name}`
      if (this.id === 0)
        this.productService.createProduct(this.productForm.value).subscribe({
          next: (response) => {
            this.router.navigate(['/products']);
          },
        });
      else
        this.productService
          .editProductById(this.id, this.productForm.value)
          .subscribe({
            next: (response) => {
              this.router.navigate(['/products']);
            },
            error: (error) => {
              throw Error(error);
            },
          });
    } else {
      this.messageError = true;
    }
  }
}
