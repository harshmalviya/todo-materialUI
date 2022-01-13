import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "../../store/taskSlice";

function TaskList({ data }) {
  const dispatch = useDispatch();

  const updateTaskHandler = (id) => {
    dispatch(taskActions.setFormData({ id }));
  };

  const updateStatusHandler = (id, status) => {
    dispatch(taskActions.updateStatus({ id, status }));
  };

  const deleteTaskHandler = (id) => {
    dispatch(taskActions.deleteTask({ id }));
  };

  return (
    <Box>
      <Typography variant="h5">Your Todos</Typography>
      {data.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{
            margin: "2rem 0"
          }}
        >
          Add a task to get started!
        </Typography>
      ) : (
        <List>
          {data.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <>
                  <IconButton onClick={() => updateTaskHandler(task.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      deleteTaskHandler(task.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              disableGutters
              disablePadding
              sx={{
                width: "100%",
                border: "1px solid #ccc",
                margin: "1rem 0",
                backgroundColor: task.status === "todo" ? "#fa5252" : "#40c057",
                color: "white"
              }}
            >
              <ListItemButton
                onClick={(e) => {
                  if (e.target.checked) {
                    updateStatusHandler(task.id, "done");
                  } else {
                    updateStatusHandler(task.id, "todo");
                  }
                }}
              >
                <ListItemIcon>
                  <Checkbox edge="start" tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary={task.title} />
                <ListItemText primary={task.status} />
                <ListItemText primary={new Date(task.dateTime).toUTCString()} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default TaskList;
