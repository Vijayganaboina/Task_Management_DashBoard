import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/tasks/taskSlice';
import { ButtonGroup, Button, Box } from '@mui/material';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

  const filters = ['all', 'completed', 'pending', 'overdue'];

  return (
    <Box className="flex-row" sx={{ justifyContent: 'center', marginTop: '1rem' }}>
    <ButtonGroup>
      {filters.map((f) => (
        <Button
          key={f}
          onClick={() => dispatch(setFilter(f))}
          sx={{
            backgroundColor: filter === f ? '#bbed21' : 'white',
            color: filter === f ? 'white' : '#bbed21',
            border: '1px solid #bbed21',
            '&:hover': {
              backgroundColor: filter === f ? '#a5d217' : '#f9f9f9',
            },
          }}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </Button>
      ))}
    </ButtonGroup>
    </Box>
  );
};

export default TaskFilters;
