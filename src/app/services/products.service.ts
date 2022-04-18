import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL ="https:/young-sands-07814.herokuapp.com/api/products/";

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiURL);
  }


  getProduct(id:string){
    return this.http.get<Product>(this.apiURL + id);
  }

  createProduct(data:CreateProductDTO){
    return this.http.post<Product>(this.apiURL, data);
  }

  updateProduct(id: string, data:UpdateProductDTO){
    //return this.http.patch<Product>(this.apiURL, data); // Edición de sólo un atributo
    return this.http.put<Product>(this.apiURL + id, data); // Se envia todo completamente no sólo lo que se cambio
  }
}
