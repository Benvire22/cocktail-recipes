import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cocktail, CocktailMutation, GlobalError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchCocktails = createAsyncThunk<Cocktail[], string | undefined>('cocktails/fetchCocktails', async (userId = '') => {
  const { data: cocktails } = await axiosApi.get<Cocktail[]>(`/cocktails?user=${userId}`);

  if (!cocktails) {
    return [];
  }

  return cocktails;
});

export const fetchOneCocktail = createAsyncThunk<Cocktail | null, string>('cocktails/fetchOneCocktail', async (cocktailId) => {
  const { data: cocktail } = await axiosApi.get<Cocktail>(`/cocktails/${cocktailId}`);

  if (!cocktail) {
    return null;
  }

  return cocktail;
});

export const createCocktail = createAsyncThunk<void, CocktailMutation, {
  rejectValue: GlobalError
}>('cocktails/create', async (cocktailMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append('title', cocktailMutation.title);
    formData.append('image', cocktailMutation.image);
    formData.append('recipe', cocktailMutation.recipe);
    formData.append('ingredients', JSON.stringify(cocktailMutation.ingredients));

    await axiosApi.post(`/cocktails/`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const togglePublished = createAsyncThunk<void, string>('cocktails/togglePublished', async (cocktailId) => {
  try {
    await axiosApi.patch(`/cocktails/${cocktailId}/togglePublished`);
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export const deleteCocktail = createAsyncThunk<void, string>('cocktails/delete', async (cocktailId) => {
  try {
    await axiosApi.delete(`/cocktails/${cocktailId}`);
  } catch (e) {
    console.error(e);
    throw e;
  }
});