import { Cocktail, GlobalError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createCocktail, deleteCocktail, fetchCocktails, fetchOneCocktail, togglePublished } from './cocktailsThunks';

export interface CocktailsState {
  cocktails: Cocktail[];
  fetchingCocktails: boolean;
  errorFetchingCocktails: boolean;
  oneCocktail: Cocktail | null;
  fetchOneCocktail: boolean;
  isCreating: boolean;
  errorCreating: null | GlobalError;
  isPublishing: boolean;
  isDeleting: boolean;
}

export const initialState: CocktailsState = {
  cocktails: [],
  fetchingCocktails: false,
  errorFetchingCocktails: false,
  oneCocktail: null,
  fetchOneCocktail: false,
  isCreating: false,
  errorCreating: null,
  isPublishing: false,
  isDeleting: false,
};

export const artistsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.fetchingCocktails = true;
        state.errorFetchingCocktails = false;
      })
      .addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.cocktails = cocktails;
        state.fetchingCocktails = false;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.fetchingCocktails = false;
        state.errorFetchingCocktails = true;
      });

    builder
      .addCase(fetchOneCocktail.pending, (state) => {
        state.oneCocktail = null;
        state.fetchOneCocktail = true;
        state.errorFetchingCocktails = false;
      })
      .addCase(fetchOneCocktail.fulfilled, (state, { payload: artist }) => {
        state.oneCocktail = artist;
        state.fetchOneCocktail = false;
      })
      .addCase(fetchOneCocktail.rejected, (state) => {
        state.fetchOneCocktail = false;
        state.errorFetchingCocktails = true;
      });

    builder
      .addCase(createCocktail.pending, (state) => {
        state.isCreating = true;
        state.errorCreating = null;
      })
      .addCase(createCocktail.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createCocktail.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.errorCreating = error || null;
      });

    builder
      .addCase(togglePublished.pending, (state) => {
        state.isPublishing = true;
      })
      .addCase(togglePublished.fulfilled, (state) => {
        state.isPublishing = false;
      })
      .addCase(togglePublished.rejected, (state) => {
        state.isPublishing = false;
      });

    builder
      .addCase(deleteCocktail.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectCocktails: (state) => state.cocktails,
    selectFetchingCocktails: (state) => state.fetchingCocktails,
    selectErrorFetchingCocktails: (state) => state.errorFetchingCocktails,
    selectOneCocktail: (state) => state.oneCocktail,
    selectFetchingOneCocktail: (state) => state.fetchOneCocktail,
    selectCreatingCocktail: (state) => state.isCreating,
    selectErrorCreatingCocktail: (state) => state.errorCreating,
    selectPublishingCocktail: (state) => state.isPublishing,
    selectDeletingCocktail: (state) => state.isDeleting,
  },
});

export const artistsReducer = artistsSlice.reducer;

export const {
  selectCocktails,
  selectFetchingCocktails,
  selectOneCocktail,
  selectFetchingOneCocktail,
  selectCreatingCocktail,
  selectErrorCreatingCocktail,
  selectPublishingCocktail,
  selectDeletingCocktail,
} = artistsSlice.selectors;
