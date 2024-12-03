import React from "react";
import TaskFormWithPanel from "./components/TaskFormWithPanel";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";
import SearchBar from "./components/SearchBar";
import { Container, Typography, Box } from "@mui/material";

function App() {
  return (
    <Container className="container">
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "400", marginTop: "2rem" }}
      >
        Task Management Dashboard
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          marginBottom: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <SearchBar />
        </Box>
        <Box sx={{ marginLeft: 0 }}>
          <TaskFormWithPanel />
        </Box>
      </Box>
      <TaskFilters />
      <TaskList />
    </Container>
  );
}

export default App;
