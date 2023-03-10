import { HttpClient } from '@angular/common/http';
import { productsList } from './../model/productList';
import { IProduct } from './../model/iproduct';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: string = 'http://localhost:3305/products';
  constructor(private httpClient: HttpClient) {}
  get getAllProducts(): Observable<Object> {
    return this.httpClient.get(this.url);
  }
  getProductById(id: number): Observable<Object> {
    return this.httpClient.get(`${this.url}/${id}`);
  }
  deleteProductById(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  editProductById(id: number, product: any): Observable<Object> {
    return this.httpClient.put(`${this.url}/${id}`, product);
  }
  createProduct(product: any): Observable<Object> {
    return this.httpClient.post(this.url, product);
  }
}
