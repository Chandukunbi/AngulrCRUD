import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  headers: HttpHeaders
  constructor(private client:HttpClient) { 
    this.headers = new HttpHeaders({ 'content-type' : 'application/json'});
    
  }

  GetProducts() : Observable<HttpResponse<Product[]>> {
    return this.client.get<Product[]>(env.apiAddress + '/product', {observe: 'response'});
  }
  GetProduct(id:any) : Observable<HttpResponse<Product>> {
    return this.client.get<Product>(env.apiAddress + '/product/' + id, {observe: 'response'});
  }
  AddProduct(model: Product) : Observable<HttpResponse<any>> {
    return this.client.post<any>(env.apiAddress + '/product' , JSON.stringify(model), {headers: this.headers, observe: 'response'});
  }
  UpdateProduct(model: Product) : Observable<HttpResponse<any>> {
    return this.client.put<any>(env.apiAddress + '/product/' + model.ProductId , JSON.stringify(model), {headers: this.headers, observe: 'response'});
  }
  DeleteProduct(id:any) : Observable<HttpResponse<any>> {
    return this.client.delete<any>(env.apiAddress + '/product/' + id , {headers: this.headers, observe: 'response'});
  }
}
