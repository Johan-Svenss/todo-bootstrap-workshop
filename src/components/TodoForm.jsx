import { useState } from "react";

function TodoForm({ addTodo }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!title) {
      alert("Title required");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title,
      description,
      date,
      completed: false,
      created: new Date().toISOString()
    };

    addTodo(newTodo);

    setTitle("");
    setDescription("");
    setDate("");
  };

  return (

    <form className="card shadow-sm p-4 mb-4" onSubmit={handleSubmit}>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Due Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button className="btn btn-primary">
        <i className="bi bi-plus-lg"></i> Add Todo
      </button>

    </form>
  );
}

export default TodoForm;