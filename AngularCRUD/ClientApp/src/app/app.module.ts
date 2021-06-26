import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [
    AppComponent,   
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent},
      { path: 'create', component: ProductComponent },
      { path: 'edit/:id', component: ProductComponent },
    ])
  ],
  providers: [CategoryService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
