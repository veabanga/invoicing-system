import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') 
    ? JSON.parse(localStorage.getItem('cart')) 
    : { cartItems: [] };

//Helper function
const AddDecimals = (num) => {
    return Math.round(num * 100) / 100;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AddToCart: (state,action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x)=> x._id === item._id)

            if(existItem){
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            } else{
                state.cartItems = [...state.cartItems, item];
            }

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
        }
    }
})

export const { AddToCart } = cartSlice.actions;
export default cartSlice.reducer;