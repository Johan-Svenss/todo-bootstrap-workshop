function FilterBar({ setFilter, setSort }) {

  return (

    <div className="card shadow-sm mb-3 p-3 d-flex flex-row justify-content-between">

      <h5>Todos</h5>

      <div className="d-flex gap-2">

        <select
          className="form-select form-select-sm"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="form-select form-select-sm"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Sort: Newest</option>
          <option value="dueDate">Sort: Due Date</option>
        </select>

      </div>

    </div>

  );
}

export default FilterBar;