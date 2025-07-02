import { useState, useEffect } from "react";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import { TodoProvider } from "./Contexts";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className="App min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
      <TodoProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
      >
        <div className="w-[95%] sm:w-[90%] max-w-4xl mx-auto p-4 sm:p-8 md:p-12 rounded-3xl backdrop-blur-xl border-2 border-gray-700 shadow-2xl shadow-black/40 bg-gray-900/80">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-2xl p-4 sm:p-7 mb-5 flex justify-center shadow-xl border-2 border-gray-700">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-white font-['Architects_Daughter'] drop-shadow-lg tracking-tight">
              To Do for {currentDate}
            </h1>
          </div>
          <div
            className={`space-y-4 sm:space-y-6 md:space-y-8 overflow-y-auto overflow-x-hidden ${
              todos.length > 4 ? "pr-2" : ""
            }`}
            style={{
              maxHeight: "50vh",
              scrollbarColor: "#374151 #111827", 
              scrollbarWidth: "thin",
              WebkitScrollbarColor: "#374151 #111827",
              WebkitScrollbarWidth: "thin",
            }}
          >
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} index={index} />
              ))
            ) : (
              <div className="text-center text-2xl font-bold text-gray-200 py-10 font-['Architects_Daughter']">
                No tasks yet
              </div>
            )}
          </div>
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-2xl p-4 sm:p-7 shadow-xl mt-7 border-2 border-gray-700">
            <TodoForm />
          </div>
        </div>
      </TodoProvider>
    </div>
  );
}

export default App;
