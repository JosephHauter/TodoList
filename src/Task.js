import React from "react";

export default function task({ task }) {
  return (
    <div>
      {/* this shows a task with a checkbox next to it */}
      <label>
        <input type="checkbox" checked={task.complete}></input>
        {task.name}
      </label>
    </div>
  );
}
