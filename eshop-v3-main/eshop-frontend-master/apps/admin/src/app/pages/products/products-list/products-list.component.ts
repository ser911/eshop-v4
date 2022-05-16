import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandsService, ProductsService, Brand } from '@eshop-frontend/products';
import { Product } from '@eshop-frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
   products: Product[];
   brands: Brand[] = [];
  endsubs$: Subject<any> = new Subject();


  constructor(private productsService: ProductsService,
              private brandsService: BrandsService,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this._getProducts();
    this._getBrands();
  }

  ngOnDestroy() {
    this.endsubs$.complete();
  }

  private _getProducts(){
    this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products =>{
      this.products = products;
      console.log(this.products);
    })

  }

  private _getBrands(){
    this.brandsService.getBrands().subscribe((brands)=>{
      this.brands = brands;
      console.log(this.brands);
      
    })
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).pipe(takeUntil(this.endsubs$)).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          }
        );
      }
    });
  }

  updateProduct(productId: string){
  this.router.navigateByUrl(`products/form/${productId}`)
  }

  goToVariants(productId){
    this.router.navigate(["/variants/product/", productId]);
  }  
}
