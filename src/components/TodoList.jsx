import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo }) {

  return (

    <div className="card shadow-sm">

      <div className="card-body">

        {todos.map(todo => (

          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />

        ))}

      </div>

    </div>

  );
}

export default TodoList;