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

export interface UserSession {
  id: string;
  fullName: string;
  email: string;
  role?: any;
  branchId?: string | null;
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
  user: UserSession | null;
  token: string | null;
  isAuthenticated: boolean;
}

const getSavedUser = (): UserSession | null => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }
  return null;
};

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
  items: [],
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
  initialState: { selectedBranchId: 'br-hq-01', branchName: 'Main Headquarters (HQ-01)' } as BranchState,
  reducers: {
    setSelectedBranch: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.selectedBranchId = action.payload.id;
      state.branchName = action.payload.name;
    },
  },
});

const initialUser = getSavedUser();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    token: null,
    isAuthenticated: !!initialUser,
  } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: UserSession; token?: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token || null;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_user');
      }
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
