import { Alert, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CocktailItem from './components/CocktailItem';
import { selectUser } from '../users/usersSlice';
import { selectCocktails, selectFetchingCocktails } from './cocktailsSlice';
import { fetchCocktails } from './cocktailsThunks';

const Artists = () => {
  const user = useAppSelector(selectUser);
  const cocktails = useAppSelector(selectCocktails);
  const isFetching = useAppSelector(selectFetchingCocktails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      void dispatch(fetchCocktails()).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  let content: React.ReactNode = (
    <Alert severity="info" sx={{ width: '100%' }}>
      There are no Cocktails here!
    </Alert>
  );

  if (isFetching) {
    content = (
      <Grid container size={12} direction="column" alignItems="center" justifyContent="center" spacing={2}>
        <CircularProgress />
      </Grid>
    );
  } else if (cocktails.length > 0) {
    content = cocktails.map((cocktail) => {
      if (cocktail.isPublished) {
        return (
          <CocktailItem
            key={cocktail._id}
            id={cocktail._id}
            title={cocktail.title}
            image={cocktail.image}
            isPublished={cocktail.isPublished}
            user={user}
          />
        );
      } else if (user?.role === 'admin') {
        return (
          <CocktailItem
            key={cocktail._id}
            id={cocktail._id}
            title={cocktail.title}
            image={cocktail.image}
            isPublished={cocktail.isPublished}
            user={user}
          />
        );
      }
    });
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid container direction="column" spacing={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="h3">Cocktail recipes list</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={5} justifyContent="center">
        {content}
      </Grid>
    </Grid>
  );
};

export default Artists;
