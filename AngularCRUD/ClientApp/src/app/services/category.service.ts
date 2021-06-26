import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  headers: HttpHeaders
  constructor(private client:HttpClient) { 
    this.headers = new HttpHeaders({ 'content-type' : 'application/json'});
    
  }

  GetCategories() : Observable<HttpResponse<Category[]>> {
    return this.client.get<Category[]>(env.apiAddress + '/category', {observe: 'response'});
  }
  GetCategory(id:any) : Observable<HttpResponse<Category>> {
    return this.client.get<Category>(env.apiAddress + '/category' + id, {observe: 'response'});
  }
  AddCategory(model: Category) : Observable<HttpResponse<any>> {
    return this.client.post<any>(env.apiAddress + '/category' , JSON.stringify(model), {headers: this.headers, observe: 'response'});
  }
  UpdateCategory(model: Category) : Observable<HttpResponse<any>> {
    return this.client.put<any>(env.apiAddress + '/category' , JSON.stringify(model), {headers: this.headers, observe: 'response'});
  }
  DeleteCategory(id:any) : Observable<HttpResponse<any>> {
    return this.client.delete<any>(env.apiAddress + '/category' + id , {headers: this.headers, observe: 'response'});
  }
}
