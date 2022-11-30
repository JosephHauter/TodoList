import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import "./App.css";
import { MDBInput, MDBFooter } from "mdb-react-ui-kit";
import ButtonAppBar from "./appBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Clock from "./Clock";
import Quote from "./Quote";
// import uuid to get a unique id for each task
import { v4 as uuidv4 } from "uuid";
// key storage for tasks
const LOCAL_STORAGE_KEY = "todoApp.tasks";

function App() {
  // array containing tasks
  const [tasks, updateTasks] = useState([]);
  // grabs user input at real time
  const taskref = useRef();
  // checks if anything stored locally and updates our usestate hook with previous tasks
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) updateTasks((prevTodos) => [...prevTodos, ...storedTodos]);
  }, []);
  // saves our tasks locally
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
  // allows us to check toggle tasks on and off
  function toggleTask(id) {
    const newTasks = [...tasks];
    const task = newTasks.find((task) => task.id === id);
    task.complete = !task.complete;
    updateTasks(newTasks);
  }

  function AddTask(e) {
    const name = taskref.current.value;
    // prevents adding empty string as a task
    if (name === "") return;
    updateTasks((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name, complete: false }];
    });
    // clears out name after submitting
    taskref.current.value = null;
  }
  // creates new list of uncompleted tasks
  function handleClearTodos() {
    const newTodos = tasks.filter((task) => !task.complete);
    updateTasks(newTodos);
  }
  // clears all tasks
  function clearAllTasks() {
    const clearAll = [];
    updateTasks(clearAll);
  }
  // dark mode which uses a switch in appBar.js
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="box">
        <div className="main">
          <div>
            <ButtonAppBar
              check={darkMode}
              change={() => setDarkMode(!darkMode)}
            />
          </div>
          <TodoList tasks={tasks} toggleTask={toggleTask} />
          <div class="w-75 p-3">
            <br></br>
            <MDBInput
              label="Enter a Task"
              inputRef={taskref}
              type="text"
              size="sm"
              placeholder="Submit Assignment"
            ></MDBInput>
          </div>
          <br></br>
          <button class="btn btn-success" onClick={AddTask}>
            Add Task
          </button>{" "}
          <button class="btn btn-info" onClick={handleClearTodos}>
            Clear Task
          </button>{" "}
          <button onClick={clearAllTasks} class="btn btn-danger">
            Clear All
          </button>
          <br></br>
          <br></br>
          <h2 className="tracker">
            {tasks.filter((task) => !task.complete).length} Tasks Unfinished
          </h2>
          <Clock />
          <br></br>
          <br></br>
          <p class="note note-secondary">
            Check all your tasks after completing them then click "Clear Task"
            to delete them
          </p>
          <Quote />
        </div>

        {/* footer displaying my github */}
        <div className="footer">
          <MDBFooter bgColor="light" className="text-center text-lg-left">
            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              <a className="text-dark" href="https://github.com/JosephHauter">
                https://github.com/JosephHauter
              </a>
            </div>
          </MDBFooter>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
