import React from "react";

export default function task({ task }) {
  return (
    <div>
      <label>
        <input type="checkbox" checked={task.complete}></input>
        {task.name}
      </label>
    </div>
  );
}
