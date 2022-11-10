import React from "react";
import Task from "./Task";
export default function TodoList({ tasks }) {
  return tasks.map((task) => {
    return <Task task={task} />;
  });
}
