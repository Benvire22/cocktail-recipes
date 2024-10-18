import React, { useState } from 'react';
import { Alert, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { ArtistMutation } from '../../../types';
import FileInput from '../../../UI/FileInput/FileInput';
import { useAppSelector } from '../../../app/hooks';
import { selectErrorCreatingArtist } from '../artistsSlice';

interface Props {
  onSubmit: (artist: ArtistMutation) => void;
  isLoading: boolean;
}

const CocktailForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const error = useAppSelector(selectErrorCreatingArtist);

  const [state, setState] = useState<ArtistMutation>({
    name: '',
    description: '',
    photo: null,
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

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          label="Artist name"
          id="name"
          name="name"
          value={state.name}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <TextField
          multiline
          minRows={4}
          label="Description"
          id="description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <FileInput
          label="Photo"
          name="photo"
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
