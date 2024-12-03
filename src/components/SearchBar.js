import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/tasks/taskSlice';
import { TextField, Box } from '@mui/material';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <Box className="flex-row" sx={{ marginBottom: 3, display: 'flex', justifyContent: 'center' }}>
      <TextField
        variant="outlined"
        placeholder="Search tasks by title..."
        onChange={handleSearchChange}
        sx={{ width: '100%', backgroundColor: 'white' }}
      />
    </Box>
  );
};

export default SearchBar;
