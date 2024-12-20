import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getURL } from '../components/configs/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private serviceURL: string = getURL('middleware');

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.serviceURL}/bp/products`);
  }

  saveProduct(data: any) {
    return this.http.post(`${this.serviceURL}/bp/products`, data);
  }
  checkProduct(id: string) {
    return this.http.get(`${this.serviceURL}/bp/products/verification/${id}`);
  }
  updateProduct(data: any) {
    let { id, ...dataWithoutId } = data;
    return this.http.put(`${this.serviceURL}/bp/products/${id}`, dataWithoutId);
  }
  deleteProduct(data: any) {
    let id = data;
    return this.http.delete(`${this.serviceURL}/bp/products/${id}`);
  }
}
