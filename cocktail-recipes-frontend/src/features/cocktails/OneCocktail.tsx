import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, CardMedia, CircularProgress, List, ListItem, ListItemText, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchingOneCocktail, selectOneCocktail } from './cocktailsSlice';
import { fetchOneCocktail } from './cocktailsThunks';
import { API_URL } from '../../constants';

const ImageCardMedia = styled(CardMedia)({
  height: '600px',
  width: '500px',
});

const OneCocktail: React.FC = () => {
  const { id } = useParams() as { id: string };
  const cocktail = useAppSelector(selectOneCocktail);
  const isFetching = useAppSelector(selectFetchingOneCocktail);
  const dispatch = useAppDispatch();

  const cardImage = `${API_URL}/${cocktail?.image}`;

  useEffect(() => {
    try {
      void dispatch(fetchOneCocktail(id)).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, id]);

  let content: React.ReactNode = (
    <Grid container direction="column" spacing={2} alignItems="center">
      <CircularProgress />
    </Grid>
  );

  if (!isFetching && cocktail) {
    content = (
      <Grid container flexDirection="column" spacing={2}>
        <Grid size={12}>
          <Grid size={6}>
            <ImageCardMedia image={cardImage} title={cocktail.title} />
          </Grid>
          <Grid size={6}>
            <Typography variant="h5" >Ingredients:</Typography>
            <List>
              {cocktail.ingredients.map((value, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText primary={`${index + 1}. ${value.title} - ${value.quantity}.`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <Grid size={12} sx={{ border: '1px solid #ccc' }} borderRadius={2} padding={2}>
          <Typography variant="h6">
            {cocktail.recipe}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" spacing={3}>
      <Grid>
        <Grid container justifyContent="space-between" marginBottom="50px" alignItems="center">
          <Grid>
            <Typography variant="h4">{cocktail?.title || (isFetching && <CircularProgress />)}</Typography>
          </Grid>
        </Grid>
        <Button variant="text" startIcon={<ArrowBackIcon />} component={Link} to="/">
          Back to all Cocktail recipes
        </Button>
      </Grid>
      {content}
    </Grid>
  );
};

export default OneCocktail;
