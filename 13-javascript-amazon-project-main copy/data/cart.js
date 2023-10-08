export const cart = []; 

 export function addToCart(productId) {
  let matchingItem;

    cart.forEach((cartItem) => {
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
        productId ,
        quantity
      });
    }
}