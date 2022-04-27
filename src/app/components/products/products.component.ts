import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { switchMap, zip } from 'rxjs/operators';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  productDetail: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: { id:'', name : ''}
  };
  showProductDetail = false;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
      console.log(data);
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onShowProductDetail(id:string){
    console.log(id);
    this.productsService.getProduct(id).subscribe(data => {
      this.productDetail = data
    });
    console.log(this.productDetail);
    this.showProductDetail = true;
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  createNewProduct(){
    this.productsService.createProduct({
      title: 'New Angular JS Product',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      categoryId: 1,
      images : ['https://controlzetacv.firebaseapp.com/assets/img/angular.png'],
      price: 1
    }).subscribe((data:any) => {
      this.productDetail = data;
      this.products.push(data);
    });
  }

  updateProduct(){
    const changest = { description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
    const id= this.productDetail.id;
    this.productsService.updateProduct( id, changest).subscribe(data => {
      console.log('update: ', data);
      this.productDetail = data;
      const index = this.products.findIndex(item => item.id === this.productDetail.id);
      this.products[index] = data;
    });
  }

  readAndUpdate(id:string){
      this.productsService.getProduct(id)
      .pipe(
        switchMap(
          (product : Product) => 
            this.productsService.updateProduct(product.id, {title: 'Change '})),
      )
      .subscribe((data : Product) => {
        console.log(data);
      });
      zip(
        this.productsService.getProduct(id),
        this.productsService.updateProduct(id, {title: 'Change '})
      )
      // .subscribe( (response:any) => {
      //     const product = response[0];
      //     const update = response[1];
      // })
  }

}
