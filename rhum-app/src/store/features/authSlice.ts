/* eslint-disable import/named */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type AuthStateType = {
  userId: number | null;
  pseudo: string | null;
  email: string | null;
  isAuthenticate: boolean;
  role: 'USER' | 'ADMIN';
};
const initialState: AuthStateType = {
  userId: null,
  pseudo: null,
  email: null,
  isAuthenticate: false,
  role: 'USER',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        id: number;
        role: 'USER' | 'ADMIN';
        pseudo: string;
        email: string;
      }>,
    ) {
      state.userId = action.payload.id;
      state.pseudo = action.payload.pseudo;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticate = true;
    },
    clearUser(state) {
      state.userId = null;
      state.isAuthenticate = false;
      state.pseudo= null;
      state.email = null;
      state.role = 'USER'
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
