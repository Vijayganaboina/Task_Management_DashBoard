import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import { TextField, Button, Box, Drawer, IconButton } from '@mui/material';
import { v4 as uuid } from 'uuid';
import AddIcon from '@mui/icons-material/Add';


const TaskFormWithPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && dueDate) {
      dispatch(addTask({ id: uuid(), title, description, dueDate, completed: false }));
      setTitle('');
      setDescription('');
      setDueDate('');
      setIsPanelOpen(false); // Close the panel after adding a task
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <IconButton
          onClick={() => setIsPanelOpen(true)}
          sx={{ backgroundColor: '#bbed21', color: 'black' }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Task Form Drawer */}
      <Drawer
        anchor="right"
        open={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        sx={{ '& .MuiDrawer-paper': { padding: 2, width: 300 } }}
      >
        <Box
          component="form"
          className="flex-col"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ backgroundColor: 'white' }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{ backgroundColor: 'white' }}
          />
          <TextField
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            sx={{ backgroundColor: 'white' }}
          />
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#bbed21' }}>
            Add Task
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default TaskFormWithPanel;
