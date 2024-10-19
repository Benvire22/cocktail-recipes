import React, { useState } from 'react';
import { Alert, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import FileInput from '../../../UI/FileInput/FileInput';
import { useAppSelector } from '../../../app/hooks';
import { CocktailMutation } from '../../../types';
import { selectErrorCreatingCocktail } from '../cocktailsSlice';

interface Props {
  onSubmit: (cocktail: CocktailMutation) => void;
  isLoading: boolean;
}

const CocktailForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const error = useAppSelector(selectErrorCreatingCocktail);

  const [state, setState] = useState<CocktailMutation>({
    title: '',
    recipe: '',
    image: null,
    ingredients: [
      { title: '', quantity: '' },
    ],
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ ...state });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onIngredientChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState(prevState => ({
      ...prevState,
      ingredients: prevState.ingredients.map((ingredient, i) => {
        if (i !== index) return ingredient;
        return {
          ...ingredient,
          [e.target.name]: e.target.value,
        };
      }),
    }));
  };

  const addIngredient = () => {
    setState({ ...state, ingredients: [...state.ingredients, { title: '', quantity: '' }] });
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const removeIngredient = (index: number) => {
    setState((prevState) => ({
        ...prevState,
        ingredients: prevState.ingredients.filter((_, i) => i !== index),
      }
    ));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error.error}
        </Alert>
      )}
      <Grid>
        <TextField
          label="Cocktail title"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          required
        />
      </Grid>
      <Grid>
        <Typography variant="h5" mb={2}>Ingredients</Typography>
        {state.ingredients.map((ingredient, i) => (
          <Grid key={i} display="flex" gap={2} marginBottom={2}>
            <TextField
              label="ingredient"
              name="title"
              value={ingredient.title}
              onChange={e => onIngredientChange(i, e)}
              required
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={ingredient.quantity}
              onChange={e => onIngredientChange(i, e)}
              required
            />
            {i > 0 ? (
              <Button color="error" variant="contained" onClick={() => removeIngredient(i)}>-</Button>
            ) : null}
          </Grid>
        ))}
        <Button onClick={addIngredient}>Add ingredient +</Button>
      </Grid>
      <Grid>
        <TextField
          multiline
          minRows={4}
          label="recipe"
          id="recipe"
          name="recipe"
          value={state.recipe}
          onChange={inputChangeHandler}
          required
        />
      </Grid>
      <Grid>
        <FileInput
          label="image"
          name="image"
          onChange={fileInputChangeHandler}
        />
      </Grid>
      <Grid>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CocktailForm;
