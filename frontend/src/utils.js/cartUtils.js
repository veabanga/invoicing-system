//Helper function
export const AddDecimals = (num) => {
    return Math.round(num * 100) / 100;
}

export const calculateItemTax = (category, price, qty) => {
    if (category === 'Product') {
      if (price > 1000 && price <= 5000) {
        return price * 0.12 * qty;
      } else if (price > 5000) {
        return price * 0.18 * qty;
      } else {
        return 200 * qty;
      }
    } else if (category === 'Service') {
      if (price > 1000 && price <= 8000) {
        return price * 0.10 * qty;
      } else if (price > 8000) {
        return price * 0.15 * qty;
      } else {
        return 100 * qty;
      }
    }
}

export const UpdateCart = (state) => {
    //Calculate Items Price
    state.itemsPrice = AddDecimals(
        state.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0)
    );

    //Calculate Tax Price
    state.taxPrice = AddDecimals(
        state.cartItems.reduce((acc, item) => {
          const tax = calculateItemTax(item.category, item.price, item.qty);
          return acc + tax * item.qty;
        }, 0)
      );
    
    //Calculate Total Price
    state.totalPrice = (
        Number(state.itemsPrice)
        + Number(state.taxPrice)
    )

    localStorage.setItem('cart',JSON.stringify(state));

    return state;
}