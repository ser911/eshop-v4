import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {ProductsService} from '@eshop-frontend/products'
import { OrdersService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Validators } from '@angular/forms';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Variant } from '@eshop-frontend/categoriesService';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemsDetailed: CartItemDetailed[] = [];
  variants;
  sizeQty: number;
  sizeQty1: number;
  sizeQty2: number;
  sizeQty3: number;
  sizeQty4: number;
  sizeQty5: number;
  sizeQty6: number;
  sizeQty7: number;
  sizeQty8: number;
  sizeQty9: number;
  sizeQty10: number;
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();

  constructor(private router: Router,
              private cartService: CartService,
              private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
      this.endSubs$.complete();
  }

  backToShop(){
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed){
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart =>{
    this.cartItemsDetailed = []; 
    this.cartCount = respCart?.items.length ?? 0;
    respCart.items.forEach(cartItem =>{
    this.ordersService.getProduct(cartItem.productId).subscribe((respProduct)=> {
      this.cartItemsDetailed.push({
        product: respProduct,
        quantity: cartItem.quantity,
        variants: cartItem.variants
      })
      this.cartService.cart2$.pipe(takeUntil(this.endSubs$)).subscribe((respCart2 =>{
        this.cartCount = respCart2.items.length ?? 0;
        respCart2.items.forEach(cartItem2 =>{
          this.ordersService.getWProduct(cartItem2.productId).subscribe((respProduct2)=>{
            this.cartItemsDetailed.push({
              product: respProduct2,
              quantity: cartItem2.quantity,
              variants: cartItem2.variants
            })
          })
        })
      }))

      console.log(this.cartItemsDetailed[0].variants[0]);
      console.log(this.cartItemsDetailed.length);     

      this.variants = this.cartItemsDetailed[0].variants[0];


      console.log(this.variants);
     


      
      
          })       
      });
    });
    
  }

  updateCartItemQuantity(event, cartItem: CartItemDetailed){
{
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value,
      },

      true
    );
      }

  }

}
