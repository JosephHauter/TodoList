import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
// import uuid to get a unique id for each task
import { v4 as uuidv4 } from "uuid";
// storgae for tasks
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
  return (
    <div>
      <TodoList tasks={tasks} />
      <input ref={taskref} type="text" />
      <button onClick={AddTask}>Add Task</button>
      <button>Clear Task</button>
      <div>0 Tasks unfinished</div>
    </div>
  );
}

export default App;
