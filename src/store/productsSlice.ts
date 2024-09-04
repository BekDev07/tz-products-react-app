import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
}

interface ProductsState {
  products: Product[];
  filter: 'all' | 'liked';
}

const initialState: ProductsState = {
  products: [],
  filter: 'all',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    toggleLike(state, action: PayloadAction<number>) {
      const product = state.products.find(product => product.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index >= 0) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<'all' | 'liked'>) {
      state.filter = action.payload;
    },
    
  },
});

export const { setProducts, toggleLike, updateProduct, deleteProduct, setFilter, addProduct } = productsSlice.actions;

export default productsSlice.reducer;
