import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          description: newItem.description,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      state.totalQuantity++;
      state.totalAmount=state.totalAmount+newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);
      const itemIndex=state.items.findIndex((item)=>item.id===id);
      console.log(existingItem);
      if (existingItem.quantity ===1) {
        state.items=state.items.filter((item)=>item.id!==existingItem.id);
        // state.items.splice(itemIndex,1);<==작동 잘 한다.
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }

      state.totalQuantity--;
      state.totalAmount-=existingItem.price;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
