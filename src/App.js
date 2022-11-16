import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
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
    <div style={{ backgroundColor: "lightpink", textAlign: "center" }}>
      <div>
        <h1>
          {tasks.filter((task) => !task.complete).length} Tasks Unfinished
        </h1>
      </div>
      <TodoList tasks={tasks} toggleTask={toggleTask} />
      <input ref={taskref} type="text" />
      <button onClick={AddTask}>Add Task</button>
      <button onClick={handleClearTodos}>Clear Task</button>
    </div>
  );
}

export default App;
