import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { CocktailMutation } from '../../types';
import { selectCreatingCocktail } from './cocktailsSlice';
import { createCocktail } from './cocktailsThunks';
import CocktailForm from './components/CocktailForm';

const NewCocktail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreatingCocktail);

  const onFormSubmit = async (cocktailMutation: CocktailMutation) => {
    try {
      await dispatch(createCocktail(cocktailMutation)).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>New Cocktail</Typography>
      <CocktailForm
        onSubmit={onFormSubmit}
        isLoading={isCreating}
      />
    </>
  );
};

export default NewCocktail;