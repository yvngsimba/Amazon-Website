import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from '../13-javascript-amazon-project-main copy/data/cart.js';

import {products} from '../13-javascript-amazon-project-main copy/data/products.js';

import {formatCurrency} from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += 
    `
      <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-price">
          ${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}"> 
            <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option" >
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML =  cartSummaryHTML;

document.querySelectorAll('.js-delete')
.forEach((link) => {
  link.addEventListener('click',() => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();

    updateCartQuantity()
  });
});

function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();
  
  document.querySelector('.js-quantity-checkout').innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();

const jsUpdateLink = document.querySelectorAll('.js-update-quantity-link');

jsUpdateLink.forEach((updateLink) => {
  updateLink.addEventListener('click', () => {
    const productId = updateLink.dataset.productId;
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  });
}); 

document.querySelectorAll('.save-quantity-link')
  .forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
      const productId = saveLink.dataset.productId;
      
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      const inputValue = document.querySelector(`.js-quantity-input-${productId}`);
      
      const newQuantity = Number(inputValue.value);
      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

      if (newQuantity >= 0 && newQuantity < 1000) {
        quantityLabel.innerHtml = newQuantity;
      } else{
          alert('Invalid Quantity, try again');
          newQuantity = 0
          quantityLabel.innerHtml = newQuantity;
      }
      
      updateCartQuantity();
    });
});