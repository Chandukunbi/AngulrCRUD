import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products : Product[];
  constructor(private productService: ProductService) {}
  ngOnInit(){

    this.productService.GetProducts().subscribe( res =>{
      //console.log(res);
      if(res.status==200)
        this.products = res.body;
    });
  }
 
}
