import React from "react";

const Todo = ({ todo, editTask, deleteTask }) => {
  return (
    <div className="todo_div">
      <button onClick={editTask}>Edit</button>
      <p>{todo}</p>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};

export default Todo;
