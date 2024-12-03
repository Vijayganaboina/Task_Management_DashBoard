import { createSlice } from '@reduxjs/toolkit';


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error("Could not load state", e);
    return [];
  }
};

const saveState = (tasks) => {
  try {
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};


const initialState = {
  tasks: loadState(), 
  filter: 'all',
  searchTerm: '',
};


const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveState(state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveState(state.tasks); 
    },
    toggleCompleted: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
      saveState(state.tasks);
    },
    editTask: (state, action) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
      saveState(state.tasks);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});


export const {
  addTask,
  editTask,
  deleteTask,
  toggleCompleted,
  setFilter,
  setSearchTerm,
} = taskSlice.actions;

export default taskSlice.reducer;
