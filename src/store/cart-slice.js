import { createSlice } from "@reduxjs/toolkit";
const initialCartState = { cartItems: [], totalQuantity: 0, change: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.cartItems = action.payload.cartItems;
    },
    addItemToCart(state, action) {
      const newItem = action.payload.item;

      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      state.change = true;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload.id;
      state.totalQuantity--;
      state.change = true;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem.quantity > 1) {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      } else {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
