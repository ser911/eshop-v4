import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'eshop-frontend-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  isChecked = false
  products: Product[] = [];
  categories: Category[] = [];
  binaryProp = true;
  isCategoryPage: boolean;
  url;
  _urlSegment;

  constructor(private prodService: ProductsService,
              private catService: CategoriesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.url = this.route.url;
    this._urlSegment = this.url.value[0].path
    console.log(this._urlSegment);

    if(this._urlSegment === "products"){
      
      this.route.params.subscribe((params)=>{
        params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
        params.categoryid ? this.isCategoryPage = true : this.isCategoryPage = false;
      })
      this._getCategories();
    }
    else{
      this.route.params.subscribe((params)=>{
        params.categoryid ? this._getWProducts([params.categoryid]) : this._getWProducts();
        params.categoryid ? this.isCategoryPage = true : this.isCategoryPage = false;
      })
    }
    this._getCategories();
    

  }

  private _getProducts(categoriesFilter?: string[]) {
    this.prodService.getMProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts;

      
      const uniqueProds = [...this.products.reduce((map, obj) => map.set(obj.name, obj), new Map()).values()];
      
      console.log(uniqueProds);
      
      this.products = uniqueProds;
 
    });
  }

  private _getWProducts(categoriesFilter?: string[]){
    this.prodService.getWProducts(categoriesFilter).subscribe((respProds)=>{
      this.products = respProds;

      const uniqueProds = [...this.products.reduce((map, obj) => map.set(obj.name, obj), new Map()).values()];
    
      this.products = uniqueProds;

    })
  }

  private _getCategories(){
    this.catService.getCategories().subscribe(resCats =>{
      this.categories = resCats;
    })
  }
  
   /* eslint-disable */


 categoryFilter() {
  const selectedCategories = this.categories
  .filter((category) => category.checked )
  .map((category)=> category.id)
  console.log(selectedCategories);

  if (this._urlSegment === "products") {
    this._getProducts(selectedCategories);
    
  }else{
    this._getWProducts(selectedCategories);
  }

  } 


}