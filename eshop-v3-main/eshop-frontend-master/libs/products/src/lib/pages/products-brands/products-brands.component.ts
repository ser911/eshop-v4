import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { W_ProductsService } from '../../services/w-products.service';
import { W_Product } from '../../models/w-product';

@Component({
  selector: 'eshop-frontend-products-brands',
  templateUrl: './products-brands.component.html',
  styles: [
  ]
})
export class ProductsBrandsComponent implements OnInit {
  isChecked = false;
  binaryProp = true;
  currentId: string;
  brandName: string;
  @Input() product: Product;
  products: Product[] = [];
  wProds: W_Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  url;
  _urlSegment;
  fromCarousel: boolean;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private catService : CategoriesService,
              private wProdService: W_ProductsService) { }

  ngOnInit(): void {

    this.url = this.route.url;
    this._urlSegment = this.url.value[0].path
    console.log(this._urlSegment);
 

        if(this._urlSegment === "products"){
          this._retrieveId();
          this._getProdByBrand();
          this.route.params.subscribe((params)=>{
            params.categoryid? this._getProducts([params.categoryid]) : this._getProdByBrand();
          })
          this._getCategories();
          this.fromCarousel = false;
    
        }
        else{
          this._retrieveId();
          this._getWProdByBrand();
          this.route.params.subscribe((params)=>{
            params.categoryid? this._getWProducts([params.categoryid]) : this._getWProdByBrand();
          })
          this._getCategories();
          this.fromCarousel =  false;
        }
      

    


  }

  private _retrieveId(){
    this.route.params.subscribe((params)=>{
       this.currentId = params.brandId;
       console.log(this.currentId);    
       console.log(this.brandName);   
       })
  }

  private _getProdByBrand(categoriesFilter?: string[]){
    this.productsService.getMProducts(categoriesFilter).subscribe((products)=>{
      this.products = products;
  
      
     const filteredByBrand = this.products.filter(prod => prod.brand === this.currentId);
      console.log(filteredByBrand);
    
      this.filteredProducts = filteredByBrand;
     
      const uniqueProds = [...this.filteredProducts.reduce((map, obj) => map.set(obj.name, obj), new Map()).values()];
      
      this.filteredProducts = uniqueProds;
      
      
    });    
  }

  private _getWProdByBrand(categoriesFilter?: string[]){
    this.productsService.getWProducts(categoriesFilter).subscribe((products)=>{
      this.products = products;
  
      
       const filtered = this.products.filter(prod => prod.brand === this.currentId)
      console.log(filtered);
      this.filteredProducts = filtered;

      const uniqueProds = [...this.filteredProducts.reduce((map, obj) => map.set(obj.name, obj), new Map()).values()];
      
      this.filteredProducts = uniqueProds;
      
      
    });    
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productsService.getProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts;
    });
  }

  private _getWProducts(categoriesFilter?: string[]) {
    this.productsService.getWProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts;
    });
  }


  private _getCategories(){
    this.catService.getCategories().subscribe(resCats =>{
      this.categories = resCats;
    })
  }

  categoryFilter(){
    const selectedCategories = this.categories.filter((category)=> category.checked).map((category)=> category.id)
    console.log(selectedCategories);
    if (this._urlSegment === "products") {
      this._getProdByBrand(selectedCategories);
      
    }else{
      this._getWProdByBrand(selectedCategories);
    }
    
  }



}
