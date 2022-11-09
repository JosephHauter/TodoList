import React, { useState } from "react";
import TodoList from "./TodoList";
function App() {
  const [tasks, updatetasks] = useState(["To do 1", "To do 2"]);
  return (
    <div>
      <TodoList tasks={tasks} />
      <input type="text" />
      <button>Add Task</button>
      <button>Clear Task</button>
      <div>0 Tasks unfinished</div>
    </div>
  );
}

export default App;
