import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";

function App() {

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  // LOAD LOCALSTORAGE
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // SAVE LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (todo) => {
    setTodos(todos.filter(t => t.id !== todo.id));
  };

  let filtered = [...todos];

  if (filter === "active") {
    filtered = filtered.filter(t => !t.completed);
  }

  if (filter === "completed") {
    filtered = filtered.filter(t => t.completed);
  }

  if (sort === "dueDate") {
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    filtered.sort((a, b) => b.id - a.id);
  }

  return (

    <div className="container py-5">

      <h2 style={{color:"red"}}>React Version</h2>

      <h1 className="text-center display-4 mb-5">
        Johan's Todo App 2.0
      </h1>

      <TodoForm addTodo={addTodo} editTodo={editTodo} />

      <FilterBar setFilter={setFilter} setSort={setSort} />

      <TodoList
        todos={filtered}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

    </div>
  );
}

export default App;