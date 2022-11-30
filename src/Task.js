import React from "react";

export default function task({ task, toggleTask }) {
  function handleTodoClick() {
    toggleTask(task.id);
  }
  return (
    <div>
      <div class="eachTask">
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
