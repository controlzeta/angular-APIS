import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL ="/api/products/";
  // private apiURL ="https:/young-sands-07814.herokuapp.com/api/products/";

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?:number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(this.apiURL, {params}).pipe(
      retry(3),
      map((products:Product[]) => products.map( (item: Product) => {
          return {
            ...item,
            taxes : .16 * item.price
          }

        }))
    );
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
