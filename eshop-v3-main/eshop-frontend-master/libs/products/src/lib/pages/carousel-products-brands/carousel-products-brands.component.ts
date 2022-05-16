import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { W_ProductsService } from '../../services/w-products.service';
import { W_Product } from '../../models/w-product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'eshop-frontend-carousel-products-brands',
  templateUrl: './carousel-products-brands.component.html',
  styles: [],
})
export class CarouselProductsBrandsComponent implements OnInit {
  isChecked = false;
  binaryProp = true;
  currentId: string;
  brandName: string;
  @Input() product: Product;
  products: Product[] = [];
  wProds: Product[] = [];
  brandAllProds: Product[] = [];
  m_filteredProducts: Product[] = [];
  w_filteredProducts: Product[] = [];
  newProducts: Product[] = [];
  firstFilter: Product[] = [];
  secondFilter: Product[] = [];
  categories: Category[] = [];
  selectedAny = false;
  selected_1 = false;
  selected_2 = false;
  m = false;
  w = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private catService: CategoriesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this._retrieveId();
    this._getCategories();
    this._getAllProdsByBrand();
    // this._getMProdByBrand();
    // this._getWprodByBrand();
  }

  private _retrieveId() {
    this.route.params.subscribe((params) => {
      this.currentId = params.brandId;
      this.brandName = params.brandName;
      console.log(this.currentId);
      console.log(this.brandName);
    });
  }

  private _getCategories() {
    this.catService.getCategories().subscribe((resCats) => {
      this.categories = resCats;
    });
  }

  private _getAllProdsByBrand() {
    this.productsService
      .getAllProductsByBrand(this.currentId)
      .subscribe((products) => {
        this.products = products;
        
        const uniqueProds = [
          ...this.products
          .reduce((map, obj) => map.set(obj.name, obj), new Map())
          .values(),
        ];
        this.products = uniqueProds;
        console.log(this.products);
      });
  }


  private _getMenProdsByBrand(brandFilter?: string) {
    this.productsService.getAllMProductsByBrand(brandFilter).subscribe((products) => {
      this.products = products;
      const uniqueProds = [
        ...this.products
          .reduce((map, obj) => map.set(obj.name, obj), new Map())
          .values(),
      ];
      this.products = uniqueProds;
      console.log(this.products);
    });
  }

  private _getWomenProdsByBrand(brandFilter?: string) {
    this.productsService.getAllWProductsByBrand(brandFilter).subscribe((products) => {
      this.products = products;
      const uniqueProds = [
        ...this.products
          .reduce((map, obj) => map.set(obj.name, obj), new Map())
          .values(),
      ];
      this.products = uniqueProds;
      console.log(this.products);

    });
  }


  // SEX SELECTION FILTER
  selectMenFromBrandAllProds(event: any) {
this.w = !this.w;
    
    this.selected_1 = !this.selected_1;
    console.log(this.selected_1);

    if (this.selected_1) {
      this._getMenProdsByBrand();
    } else {
      this._getAllProdsByBrand();
    }
  }
  selectWomenFromBrandAllProds(event: any) {
    this.m = !this.m;
      const info = event.originalEvent.target.innerHTML;
      console.log(info.includes('women'));

    this.selected_2 = !this.selected_2;
    if (this.selected_2) {
      this._getWomenProdsByBrand();
    } else {
      this._getAllProdsByBrand();

    }
  }

  categoryFilter(event: any) {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);


    if (this.selected_1 && selectedCategories.length > 0) {
      this.productsService.getMproductsFilteredByCategoryAndBrand(selectedCategories,this.currentId).subscribe((products) => {
          this.products = products;
                const uniqueProds = [
                  ...this.products
                    .reduce((map, obj) => map.set(obj.name, obj), new Map())
                    .values(),
                ];
                this.products = uniqueProds;
                console.log(this.products);
        });
      }
      if (this.selected_1 && selectedCategories.length === 0) {
        this._getMenProdsByBrand();
      }
      
    if (this.selected_2 && selectedCategories.length > 0) {
      this.productsService.getWproductsFilteredByCategoryAndBrand(selectedCategories, this.currentId).subscribe((products)=>{
        this.products = products;
              const uniqueProds = [
                ...this.products
                  .reduce((map, obj) => map.set(obj.name, obj), new Map())
                  .values(),
              ];
              this.products = uniqueProds;
              console.log(this.products);
      })
    }
       if (this.selected_2 && selectedCategories.length === 0) {
         this._getWomenProdsByBrand();
       }
    
  }
  
}
