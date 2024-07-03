// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';


interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  qty: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.find((item) => item._id === newItem._id);

      if (existingItem) {
    
        existingItem.qty += 1;
       
      } else {
       
        state.push({ ...newItem, qty: 1 });
      }
    },
    removeCart: (state, action: PayloadAction<null>) => {
      const itemId = action.payload;
    
  
      if (itemId!==null) {
        return state.filter((item) => item._id !== itemId);
      } else {
      
        return [];
      }
    },
  
      decreaseQuantity: (state, action: PayloadAction<string>) => {
        const itemId = action.payload;
        const existingItem = state.find((item) => item._id === itemId);
      
        if (existingItem && existingItem.qty === 1) {
      
          return state.filter((item) => item._id !== itemId);
        } else if (existingItem) {
      
          const updatedQuantity = existingItem.qty - 1;
        
          
          return state.map((item) => (item._id === itemId ? { ...existingItem, qty: updatedQuantity } : item));
        } else {
         
          return state;
        }
      },
      
  },
});

export const { addItem, removeCart, decreaseQuantity } = cartSlice.actions;

// Selector to get the cart state
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
