import React, { useRef, useState } from 'react';
import { Button, Grid2, TextField } from '@mui/material';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, label }) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  return (
    <>
      <input type="file" name={name} style={{ display: 'none' }} ref={inputRef} onChange={onFileChange} />
      <Grid2 container spacing={2} alignItems="center">
        <Grid2>
          <TextField label={label} InputProps={{ readOnly: true }} value={filename} onClick={activateInput} />
        </Grid2>
        <Grid2>
          <Button variant="outlined" onClick={activateInput}>
            Browse
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};

export default FileInput;
