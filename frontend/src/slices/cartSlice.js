import { createSlice } from "@reduxjs/toolkit";
import { UpdateCart } from "../utils.js/cartUtils";

const initialState = localStorage.getItem('cart') 
    ? JSON.parse(localStorage.getItem('cart')) 
    : { cartItems: [] };

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

            return UpdateCart(state);
        },
        RemoveFromCart: (state,action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
            return UpdateCart(state);
        },
        ClearCart: (state,action) => {
            state.cartItems = [];
            return UpdateCart(state);
        },
        ResetCart: (state) => (state = initialState)
    }
})

export const { AddToCart, RemoveFromCart, ClearCart, ResetCart } = cartSlice.actions;
export default cartSlice.reducer;