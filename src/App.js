import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import "./App.css";
import Form from "./components/Form/Form";
import TaskList from "./components/Tasks/TaskList";

function App() {
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <Container maxWidth="md">
      <Form />
      <TaskList data={tasks} />
    </Container>
  );
}

export default App;