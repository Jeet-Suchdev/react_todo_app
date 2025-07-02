import React, { useState, useRef, useEffect } from "react";
import { useTodo } from "../Contexts/index";

// Custom scrollbar styles for large screens
const customScrollbar = `
  @media (min-width: 1024px) {
    textarea::-webkit-scrollbar {
      height: 3px;
    }
    textarea::-webkit-scrollbar-thumb {
      background: #6366f1;
      border-radius: 4px;
    }
    textarea::-webkit-scrollbar-track {
      background: transparent;
    }
  }
`;

function TodoItem({ todo, index }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [hasHorizontalScroll, setHasHorizontalScroll] = useState(false);
  const textareaRef = useRef(null);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      setHasHorizontalScroll(el.scrollWidth > el.clientWidth);
    }
  }, [todoMsg, isTodoEditable]);

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
    <>
      <div
        className={`w-full bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-gray-800/80 border border-gray-700 rounded-2xl shadow-xl px-4 py-3 mb-4 flex flex-col gap-2 transition-all duration-300 hover:border-indigo-400 hover:shadow-[0_0_16px_2px_rgba(99,102,241,0.5)] ${todo.completed ? "opacity-60" : ""}`}
      >
        {/* Top row: Checkbox, index, todo text */}
        <div className="flex items-center gap-2 w-full font-['Architects_Daughter']">
          <input
            type="checkbox"
            className="cursor-pointer w-4 h-4 accent-violet-500"
            checked={todo.completed}
            onChange={toggleCompleted}
          />
          <span className="text-xl lg:text-2xl lg:md:text-3xl text-gray-200 select-none font-bold flex items-center h-full align-baseline">{index + 1}.</span>
          <div className="flex-1 min-w-0 flex items-center h-full align-baseline">
            <textarea
              ref={textareaRef}
              className={`custom-scrollbar w-full overflow-x-auto whitespace-nowrap min-h-[2.5rem] max-h-40 bg-transparent outline-none px-2 py-1 ${hasHorizontalScroll ? 'pb-2 lg:pb-3' : ''} text-white text-xl lg:text-2xl lg:md:text-3xl font-semibold font-['Architects_Daughter'] transition-all ${todo.completed ? "line-through text-gray-400" : ""} ${isTodoEditable ? "bg-white/20 ring-2 ring-[#8b5cf6]" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
              rows={1}
              style={{resize: 'none', overflowY: 'hidden'}}
            />
          </div>
        </div>
        {/* Bottom row: Date and action buttons */}
        <div className="flex flex-row items-center justify-between gap-2">
          <span className="px-2 py-1 rounded-full bg-violet-700 text-white text-xs md:text-sm font-bold tracking-wide whitespace-nowrap shadow ring-2 ring-violet-400/40 font-['Nunito',_sans-serif]">
            {todo.date}
          </span>
          <div className="flex gap-2">
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
              className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-800 hover:bg-red-600 text-gray-200 hover:text-white text-xl shadow transition-all"
              onClick={() => deleteTodo(todo.id)}
            >
              ❌
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoItem;
