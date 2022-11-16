import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import "./App.css";
import { MDBBtn, MDBInput, MDBTypography, MDBFooter } from "mdb-react-ui-kit";

// import uuid to get a unique id for each task
import { v4 as uuidv4 } from "uuid";
// storage for tasks
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

  return (
    <div className="box">
      <div className="main">
        <div>
          <h1>Task Completer</h1>
          <h2 className="header">
            {tasks.filter((task) => !task.complete).length} Tasks Unfinished
          </h2>
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
        <MDBBtn MDBBtn className="me-1" color="success" onClick={AddTask}>
          Add Task
        </MDBBtn>{" "}
        <MDBBtn className="me-1" color="danger" onClick={handleClearTodos}>
          Clear Task
        </MDBBtn>{" "}
        <br></br>
        <br></br>
        <p class="note note-secondary">
          Check all your tasks then click "Clear Task" to delete them
        </p>
        <figure className="mb-0">
          <MDBTypography blockquote>
            <p>
              How wonderful it is that nobody need wait a single moment before
              starting to improve the world.
            </p>
          </MDBTypography>
          <figcaption className="blockquote-footer mb-0">
            Anne Frank <cite title="Source Title">Jewish diarist</cite>
          </figcaption>
        </figure>
      </div>
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
  );
}

export default App;
