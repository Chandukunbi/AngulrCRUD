import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  id: number = 0;
  productForm : FormGroup;
  categories: Category[];
  constructor(private fb : FormBuilder, private productService: ProductService, private categoryService : CategoryService, private router:Router, private route: ActivatedRoute) {
    this.productForm = this.fb.group({
        ProductId : [0, Validators.required],  
        CategoryId : ['', Validators.required],
        Name : ['', Validators.required],
        Description : ['',Validators.required],
        UnitPrice : ['',Validators.required],        
    });
  }

  ngOnInit(){
    //read route parameter
    this.route.params.subscribe(p=>{
      if(p != undefined)
        this.id = p.id;
        //console.log(this.id);
    });
    //get categories
    this.categoryService.GetCategories().subscribe(res => {
        if(res.status == 200)
          this.categories = res.body;
    });
    //if edit then call getProduct
    if(this.id>0){
      this.productService.GetProduct(this.id).subscribe(res=>{
        if(res.status == 200)
        {
          console.log(res.body);
          let data : Product =  res.body;
          this.productForm.setValue({
            Name: data.Name,
            Description: data.Description,
            UnitPrice: data.UnitPrice,
            CategoryId: data.CategoryId,
            ProductId: data.ProductId        
         });
        }
      });     
    }
  }

  SaveData(){
    if(this.productForm.valid) {
      let model : Product = this.productForm.value;
      if(model.ProductId > 0)
      {
          this.productService.UpdateProduct(model).subscribe(res => {
              if(res.status==200)
              this.NavigateToProdutList();
          });
      }
      else
      {
        this.productService.AddProduct(model).subscribe(res =>{
          if(res.status==201)
            this.NavigateToProdutList();
        });
      }
    }
  }

  DeleteData(){
    if(confirm('Are you sure want to delete this product?')){
      this.productService.DeleteProduct(this.id).subscribe(res => {
        if(res.status == 200)
          this.NavigateToProdutList();
      });
    }
  }

  NavigateToProdutList(){
    this.router.navigate(['/']);
  }

 
}
