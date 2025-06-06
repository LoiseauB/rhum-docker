import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FavoritesStateType = {
  favorites: number[];
};

const initialState: FavoritesStateType = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setOneFavorite(state, action: PayloadAction<{ newFav: number }>) {
      state.favorites = [...state.favorites, action.payload.newFav];
    },
    setFavorites(state, action: PayloadAction<{ favorites: number[] }>) {
      state.favorites = action.payload.favorites;
    },
    deleteFavorite(state, action: PayloadAction<{ toDelete: number }>) {
      state.favorites = state.favorites.filter(
        value => value !== action.payload.toDelete,
      );
    },
    clearFavorites(state) {
      state.favorites = [];
    },
  },
});

export const { setOneFavorite, setFavorites, deleteFavorite, clearFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
