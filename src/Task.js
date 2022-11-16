import React from "react";

export default function task({ task, toggleTask }) {
  function handleTodoClick() {
    toggleTask(task.id);
  }
  return (
    <div>
      <div
        style={{
          backgroundColor: "lightblue",
          fontWeight: "bold",
          fontSize: 15,
        }}
      >
        {/* this shows a task with a checkbox next to it */}
        <label>
          <input
            type="checkbox"
            checked={task.complete}
            onChange={handleTodoClick}
          ></input>
          {task.name}
        </label>
      </div>
    </div>
  );
}
