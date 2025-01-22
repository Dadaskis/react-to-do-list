import React, { useState, useCallback } from "react";
import Task from "./Task";
import "./TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const moveTask = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = tasks[dragIndex];
      const hoverItem = tasks[hoverIndex];
      if (dragItem === hoverItem) {
        return;
      }
      // Swap places of dragItem and hoverItem in the tasks array
      setTasks((tasks) => {
        const updatedTasks = [...tasks];
        updatedTasks[dragIndex] = hoverItem;
        updatedTasks[hoverIndex] = dragItem;
        return updatedTasks;
      });
    },
    [tasks]
  );

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, index: tasks.length }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            moveTask={moveTask}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
