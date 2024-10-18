import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, IconButton, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { API_URL } from '../../../constants';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { User } from '../../../types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { selectDeletingCocktail, selectPublishingCocktail } from '../cocktailsSlice';
import { deleteCocktail, fetchCocktails, togglePublished } from '../cocktailsThunks';

const ImageCardMedia = styled(CardMedia)({
  height: '100px',
  width: '100px',
  borderRadius: '50%',
});

interface Props {
  id: string;
  title: string;
  image: string;
  isPublished: boolean;
  user: User | null;
}

const CocktailItem: React.FC<Props> = ({ id, title, image, isPublished, user }) => {
  const isPublishing = useAppSelector(selectPublishingCocktail);
  const isDeleting = useAppSelector(selectDeletingCocktail);
  const dispatch = useAppDispatch();

  const handleToggle = async () => {
    try {
      await dispatch(togglePublished(id)).unwrap();
      await dispatch(fetchCocktails()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  let cardImage = `${API_URL}/${image}`;

  const handleDelete = async () => {
    try {
      await dispatch(deleteCocktail(id)).unwrap();
      await dispatch(fetchCocktails()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid sx={{ width: '100%', margin: '20px 0 0 60px' }}>
      {!isPublished && (
        <Typography variant="h5" color="#ccc">in verification</Typography>
      )}
      <Card sx={{ display: 'flex', p: 2 }}>
        <ImageCardMedia image={cardImage} title={title} />
        <CardHeader title={title} />
        <CardActions sx={{ marginLeft: 'auto' }}>
          {user?.role === 'admin' && !isPublished && (
            <LoadingButton
              type="button"
              onClick={handleToggle}
              fullWidth
              color="primary"
              loading={isPublishing}
              loadingPosition="end"
              endIcon={<ArrowForwardIcon />}
              variant="contained"
            >
              <span>Publish</span>
            </LoadingButton>
          )}
          {user?.role === 'admin' && (
            <LoadingButton
              type="button"
              onClick={handleDelete}
              fullWidth
              color="error"
              loading={isDeleting}
              loadingPosition="end"
              endIcon={<DeleteForeverIcon />}
              variant="contained"
            >
              <span>delete cocktail</span>
            </LoadingButton>
          )}
          <IconButton component={Link} to={`/cocktails/${id}`}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CocktailItem;
