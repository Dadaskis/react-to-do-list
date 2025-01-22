import React from "react";
import { useDrag, useDrop } from "react-dnd";
import "./Task.css";

function Task({
  task = "None",
  index = -1,
  moveTask = function () {},
  toggleTaskCompletion = function () {},
  deleteTask = function () {},
}) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "task",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [spec, dropRef] = useDrop({
    accept: "task",
    hover: (task, monitor) => {
      const dragIndex = task.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveTask(dragIndex, hoverIndex);
      task.index = hoverIndex;
    },
  });

  const ref = React.useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  //drag(drop(ref));

  return (
    <div
      ref={dragDropRef}
      className={`task ${task.completed ? "completed" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <p>{index + 1}</p>
      <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
      <button onClick={() => deleteTask(index)}>Delete</button>
    </div>
  );
}

export default Task;
