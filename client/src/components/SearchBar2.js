import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton, InputAdornment, Box } from '@mui/material';
import { useState } from 'react';
import { Search } from '@mui/icons-material';

export default function SearchBar2({ movies, search, setSearch }) {
  console.log(movies);
  return (
    <Autocomplete 
      id="search-movies"
      sx={{ width: 300 }}
      options={movies}
      autoHighlight
      inputValue={search}
      getOptionLabel={option => option.title}
      onInputChange={(e, newValue) => {
        setSearch(newValue)
      }}
      renderInput={(params) => (
        <TextField {...params} 
          label="Search Movies"
        />
      )}
      renderOption={
        (props, option) => (
          <div {...props}>
            {option.title}
          </div>
        )
      }
    />  
  );
}
