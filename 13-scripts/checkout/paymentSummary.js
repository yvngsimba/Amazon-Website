import {cart} from "../../13-javascript-amazon-project-main copy/data/cart.js";
import {getProduct} from '../../13-javascript-amazon-project-main copy/data/products.js';
import {deliveryOptions, getDelivery} from '../../13-javascript-amazon-project-main copy/data/deliveryOptions.js';

export function renderPaymentSummary() {
  let productPriceCents =  0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity

    const deliveryOption = getDelivery(cartItem.deliveryOptionId)

    shippingPriceCents += deliveryOption.deliveryPrice


    
  });

  console.log(productPriceCents) 
  console.log(shippingPriceCents) 
}