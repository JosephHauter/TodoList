import React, { useState } from "react";
export default function Clock() {
  let time = new Date().toLocaleTimeString();
  const [currentTime, setTime] = useState(time);
  function updateTime() {
    let time = new Date().toLocaleTimeString();
    setTime(time);
  }
  setInterval(updateTime, 1000);

  return (
    <div className="clockdiv">
      <h1>{currentTime}</h1>
    </div>
  );
}
