import TodoList from "./ToDoList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  // <TodoList />
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <TodoList/>
      </DndProvider>
    </>
  );
}

export default App;
