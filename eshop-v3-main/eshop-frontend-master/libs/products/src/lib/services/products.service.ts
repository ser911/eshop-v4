import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrlProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {}

  // BASIC

  // Get all products in the database - optional category query params

  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
      console.log(params);
    }
    return this.http.get<Product[]>(this.apiUrlProducts, { params: params });
  }

  // SEX FILTER

  // Get products for men - optional categories query params

  getMProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
      console.log(params);
    }
    return this.http.get<Product[]>(`${this.apiUrlProducts}/get/men-prods`, {
      params: params,
    });
  }

  // Get products for women - optional categories query params

  getWProducts(categoriesFilter?: string[]) {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>(`${this.apiUrlProducts}/get/women-prods`, {
      params: params,
    });
  }

  getAllProductsByBrand(brandFilter?: string) {
    let params = new HttpParams();
    if (brandFilter) {
      params = params.append('brand', brandFilter);
    }
    return this.http.get<Product[]>(`${this.apiUrlProducts}/get/brand/all`, {
      params: params,
    });
  }

  getAllMProductsByBrand(brandFilter?: string) {
    let params = new HttpParams();
    if (brandFilter) {
      params = params.append('brand', brandFilter);
    }
    return this.http.get<Product[]>(`${this.apiUrlProducts}/get/brand/men`, {
      params: params,
    });
  }
  getAllWProductsByBrand(brandFilter?: string) {
    let params = new HttpParams();
    if (brandFilter) {
      params = params.append('brand', brandFilter);
    }
    return this.http.get<Product[]>(`${this.apiUrlProducts}/get/brand/women`, {
      params: params,
    });
  }

  // Get products for men - optional categories & brand query params

  getMproductsFilteredByCategoryAndBrand(
    categoriesFilter?: string[],
    brandFilter?: string
  ) {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }

    if (brandFilter) {
      params = params.append('brand', brandFilter);
    }
    return this.http.get<Product[]>(
      `${this.apiUrlProducts}/get/brand-and-category/men`,
      {
        params: params,
      }
    );
  }

  // Get products for women - optional categories & brand query params

  getWproductsFilteredByCategoryAndBrand(
    categoriesFilter?: string[],
    brandFilter?: string
  ) {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }

    if (brandFilter) {
      params = params.append('brand', brandFilter);
    }
    return this.http.get<Product[]>(
      `${this.apiUrlProducts}/get/brand-and-category/women`,
      { params: params }
    );
  }

  // Get all products filtered by brand only.

  getProductsByBrand(brandId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrlProducts}/brand/${brandId}`);
  }

  getWProductsByBrand(brandId: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrlProducts}/brand/women-products/${brandId}`
    );
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
  }

  getProductByName(prodName: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrlProducts}/prodname/${prodName}`
    );
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrlProducts, productData);
  }

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrlProducts}/${productid}`,
      productData
    );
  }

  updateProductWithVariant(
    productData: FormData,
    productid: string
  ): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrlProducts}/${productid}/add/variant`,
      productData
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlProducts}/${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrlProducts}/get/featured/`);
  }

  addGallery(
    productId: string,
    galleryFormData: FormData
  ): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrlProducts}/gallery-images/${productId}`,
      galleryFormData
    );
  }
}
