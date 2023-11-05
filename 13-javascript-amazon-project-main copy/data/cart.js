export let cart = JSON.parse(localStorage.getItem('cart')); 

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }]
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

    cart.forEach((cartItem) => {
      const productId = cartItem.productId

      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    const quantitySelector = document.querySelector(`.is-quantity-selector-${productId}`);

    const quantity = Number(quantitySelector.value);

    
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
};

export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem) => {
    let matchingItem;

    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }

    matchingItem.quantity = newQuantity;

    if (newQuantity >= 0 && newQuantity < 1000) {
      saveToStorage()
    } else {
        alert('Quantity must be at least 0 and less than 1000');
        return 0
    }
    
  });
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
