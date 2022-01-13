import Card from "@mui/material/Card";
import FormGroup from "@mui/material/FormGroup";
import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../store/taskSlice";
import { v4 as uuidv4 } from "uuid";

function Form({ addTask }) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(null);

  const [error, setError] = useState(false);
  const isEditing = useSelector((state) => state.tasks.isEditing);
  const formState = useSelector((state) => state.tasks.formState);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || dateTime === null) {
      setError(true);
      return;
    }

    const task = {
      id: formState.id || uuidv4(),
      title,
      dateTime: dateTime.toISOString(),
      status: formState.status || "todo"
    };

    if (isEditing) {
      dispatch(taskActions.updateTask(task));
    } else {
      dispatch(taskActions.createTask(task));
    }
    setTitle("");
    setDateTime(null);
  };

  useEffect(() => {
    if (isEditing) {
      setTitle(formState.title);
      setDateTime(new Date(formState.dateTime));
    }
  }, [isEditing, formState]);

  return (
    <Card sx={{ padding: "1rem 2rem", margin: "2rem 0" }}>
      <Typography variant="h4" align="center">
        {isEditing ? "Edit Task" : "Add Task"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormGroup sx={{ margin: "2rem 0" }}>
          <TextField
            id="outlined-basic"
            label="Task"
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            error={error}
            helperText={error ? "Task is required" : ""}
            onFocus={() => {
              setError(false);
            }}
            value={title}
          />
        </FormGroup>
        <FormGroup>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Due Date & Time"
              value={dateTime}
              onChange={(newValue) => {
                setDateTime(newValue);
              }}
            />
          </LocalizationProvider>
        </FormGroup>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "2rem 0 1rem 0"
          }}
        >
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Add Task
          </Button>
        </Box>
      </form>
    </Card>
  );
}

export default Form;
