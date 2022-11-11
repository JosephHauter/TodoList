import React from "react";
import Task from "./Task";
// loops through every task displaying each element
export default function TodoList({ tasks }) {
  return tasks.map((task) => {
    return <Task key={task.id} task={task} />;
  });
}
