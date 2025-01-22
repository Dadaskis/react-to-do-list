import React, { useState, useCallback, useEffect } from "react";
import Task from "./Task";
import "./TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function saveTasks() {
    if ([...tasks].length == 0) {
      return;
    }
    localStorage.setItem("tasks", JSON.stringify([...tasks]));
  }

  function saveEmptyTasks() {
    localStorage.setItem("tasks", JSON.stringify([]));
  }

  function loadTasks() {
    console.log("Loading tasks...");
    const tasksJSON = localStorage.getItem("tasks");
    if (!tasksJSON) {
      console.error("Local storage value is invalid.");
      return;
    }
    let parsedTasks;
    try {
      parsedTasks = JSON.parse(tasksJSON);
    } catch (ex) {
      console.error("Couldn't parse JSON for tasks.");
      return;
    }
    if (parsedTasks && typeof parsedTasks === "object") {
      setTasks(parsedTasks);
    } else {
      console.error("Parsed value is not an object.");
    }
    console.log("Successfuly completed loading of tasks.");
  }

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

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
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          index: tasks.length,
        },
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    if ([...tasks].length == 1) {
      setTasks([]);
      saveEmptyTasks();
      return;
    }
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
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
