import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  specs: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ProductItem {
  id: string;
  name: string;
  specs: string;
  price: number;
  inStock: boolean;
  image: string;
}

interface CartState {
  items: CartItem[];
}

interface WishlistState {
  items: ProductItem[];
}

interface BranchState {
  selectedBranchId: string;
  branchName: string;
}

interface AuthState {
  user: { id: string; name: string; email: string; role: string } | null;
  token: string | null;
}

const initialCartState: CartState = {
  items: [
    {
      id: 'var-1',
      name: 'iPhone 15 Pro Max',
      specs: '256GB, Natural Titanium',
      price: 1099,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'var-2',
      name: 'MacBook Air M3',
      specs: '13-inch, 256GB SSD',
      price: 1199,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'var-3',
      name: 'AirPods Pro (2nd Gen)',
      specs: 'White',
      price: 249,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=400',
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

const initialWishlistState: WishlistState = {
  items: [
    {
      id: 'var-1',
      name: 'iPhone 15 Pro Max',
      specs: '256GB, Natural Titanium',
      price: 1099,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'var-2',
      name: 'MacBook Air M3',
      specs: '13-inch, 256GB SSD',
      price: 1199,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'var-3',
      name: 'AirPods Pro (2nd Gen)',
      specs: 'White',
      price: 249,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'var-4',
      name: 'Apple Watch Series 9',
      specs: 'Starlight, 41mm',
      price: 299,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 'var-5',
      name: 'Samsung Galaxy S24 Ultra',
      specs: '12GB RAM, 256GB Storage',
      price: 1049,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400',
    },
  ],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialWishlistState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<ProductItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

const branchSlice = createSlice({
  name: 'branch',
  initialState: { selectedBranchId: 'br-nyc-01', branchName: 'New York Main Store' } as BranchState,
  reducers: {
    setSelectedBranch: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.selectedBranchId = action.payload.id;
      state.branchName = action.payload.name;
    },
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export const { setSelectedBranch } = branchSlice.actions;
export const { setCredentials, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    branch: branchSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
