import React, { useState } from "react";
import { useTodo } from "../Contexts/index";

function TodoItem({ todo, index }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, {
      ...todo,
      todo: todoMsg,
      date: new Date().toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex flex-col lg:flex-row items-start lg:items-center lg:gap-x-6 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border border-gray-700 rounded-2xl px-3 lg:px-5 py-2 lg:py-3 shadow-lg text-white font-['Architects_Daughter'] text-base lg:text-lg lg:md:text-xl transition-all duration-300 hover:border-indigo-400 hover:shadow-[0_0_12px_2px_rgba(99,102,241,0.5)] ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center w-full lg:flex-1 mb-2 lg:mb-0">
        <input
          type="checkbox"
          className="cursor-pointer w-4 h-4 lg:w-5 lg:h-5 accent-violet-500 mr-2 lg:mr-4"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <span className="text-xl lg:text-2xl lg:md:text-3xl text-gray-200 select-none font-bold">
          {index + 1}.
        </span>
        <input
          type="text"
          className={`w-full bg-transparent outline-none rounded-lg px-2 py-1 text-white text-xl lg:text-2xl lg:md:text-3xl font-semibold ${
            todo.completed ? "line-through text-gray-400" : ""
          } ${isTodoEditable ? "bg-white/30 ring-2 ring-[#8b5cf6]" : ""}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
      </div>
      <div className="flex flex-row items-center justify-end gap-2 w-full lg:w-auto lg:ml-auto lg:flex-row lg:items-center">
        <span className="px-2 py-1 rounded-full bg-violet-700 text-white text-xs md:text-sm font-bold tracking-wide whitespace-nowrap shadow ring-2 ring-violet-400/40 font-['Nunito',_sans-serif]">
          {todo.date}
        </span>
        <div className="flex gap-2 ml-auto lg:ml-0">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#8b5cf6] hover:bg-violet-700 text-white text-xl shadow-md transition-all disabled:opacity-50"
            onClick={() => {
              if (todo.completed) return;
              if (isTodoEditable) {
                editTodo();
              } else {
                setTodoMsg(todo.todo);
                setIsTodoEditable(true);
              }
            }}
            disabled={todo.completed}
          >
            {isTodoEditable ? "📁" : "✏️"}
          </button>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/30 hover:bg-red-600 text-white text-xl shadow-md transition-all"
            onClick={() => deleteTodo(todo.id)}
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
