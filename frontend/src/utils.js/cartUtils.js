//Helper function
export const AddDecimals = (num) => {
    return Math.round(num * 100) / 100;
}

export const UpdateCart = (state) => {
    //Calculate Items Price
    state.itemsPrice = AddDecimals(
        state.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0)
    );

    //Calculate Tax Price
    
    //Calculate Total Price
    state.totalPrice = (
        Number(state.itemsPrice)
        // + Number(state.taxPrice)
    )

    localStorage.setItem('cart',JSON.stringify(state));

    return state;
}