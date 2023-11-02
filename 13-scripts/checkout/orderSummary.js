import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../13-javascript-amazon-project-main copy/data/cart.js';
import {products} from '../../13-javascript-amazon-project-main copy/data/products.js';
import {formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from'../../13-javascript-amazon-project-main copy/data/deliveryOptions.js';

hello();


const today = dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId 

    let deliveryOption; 

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId ) {
        deliveryOption = option;
      }
    })

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const  dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML += 
      `
        <div class="cart-item-container 
          js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
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
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';


    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const  dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.deliveryPrice === 0
        ? 'FREE' 
        : `$${formatCurrency(deliveryOption.deliveryPrice)} -`;
        
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        
        
        html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    
    return html;
  };




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

        const inputValue = document.querySelector(`.js-quantity-input-${productId}`);
        
        const newQuantity = Number(inputValue.value);
        updateQuantity(productId, newQuantity);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity');

        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        updateCartQuantity();
        renderOrderSummary(); 
      });
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
      });
    });
}

