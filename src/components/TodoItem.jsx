function TodoItem({ todo, toggleTodo, deleteTodo }) {

  return (

    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>

      <div className="d-flex justify-content-between">

        <div>

          <h5>{todo.title}</h5>

          <p className="text-muted">{todo.description}</p>

          {todo.date && (
            <span className="badge badge-light">
              <i className="bi bi-calendar"></i> Due: {todo.date}
            </span>
          )}

        </div>

        <div className="d-flex gap-2">

          <button
            className="btn action-btn btn-checkmark"
            onClick={() => toggleTodo(todo.id)}
          >
            <i className="bi bi-check-lg"></i>
          </button>

          <button
            className="btn action-btn btn-delete"
            onClick={() => deleteTodo(todo.id)}
          >
            <i className="bi bi-trash"></i>
          </button>

        </div>

      </div>

      <small className="text-muted">
        Created: {todo.created.split("T")[0]}
      </small>

    </div>
  );
}

export default TodoItem;