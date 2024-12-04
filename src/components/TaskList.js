import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCompleted, deleteTask } from "../features/tasks/taskSlice";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const searchTerm = useSelector((state) => state.tasks.searchTerm);
  const dispatch = useDispatch();

  const filteredTasks = tasks
    .filter((task) => {
      const overdue = new Date(task.dueDate) < new Date();
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      if (filter === "overdue") return overdue && !task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Box
      className="task-list"
      sx={{
        border: "1px solid grey",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: 2,
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      {filteredTasks.length > 0 ? (
        <List sx={{ padding: "0" }}>
          {filteredTasks.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <Box className="flex-row">
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    onChange={() => dispatch(toggleCompleted(task.id))}
                  />
                  <IconButton
                    edge="end"
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              sx={{
                backgroundColor: "#71a3c1",
                color: "white",
                marginBottom: "0.5rem",
                borderRadius: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <ListItemText
                primary={task.title}
                secondary={`Due: ${new Date(
                  task.dueDate
                ).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box
          className="flex-col"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "150px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            Create a task
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This view will show tasks you are responsible for.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TaskList;
