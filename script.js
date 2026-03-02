const addButton = document.getElementById("addButton");
const titleInput = document.getElementById("titleInput");
const descriptionInput = document.getElementById("descriptionInput");
const dateInput = document.getElementById("dateInput");
const fileInput = document.getElementById("fileInput");
const todoList = document.getElementById("todoList");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");

let todos = [];

// LOAD FROM LOCALSTORAGE
document.addEventListener("DOMContentLoaded", function () {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
});

// SAVE TO LOCALSTORAGE
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// ADD TODO
addButton.addEventListener("click", function () {

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const date = dateInput.value;
    const file = fileInput.files[0];

    if (!title) {
        alert("Title is required!");
        return;
    }

    const newTodo = {
        id: Date.now(),
        title,
        description,
        date,
        fileName: file ? file.name : null,
        completed: false,
        created: new Date().toISOString()
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();

    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    fileInput.value = "";
});

// RENDER TODOS
function renderTodos() {

    todoList.innerHTML = "";

    let filteredTodos = [...todos];

    // FILTERING
    if (filterSelect.value === "active") {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (filterSelect.value === "completed") {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    // SORTING
    if (sortSelect.value === "dueDate") {
        filteredTodos.sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(a.date) - new Date(b.date);
        });
    } else {
        filteredTodos.sort((a, b) => b.id - a.id);
    }

    filteredTodos.forEach(todo => {

        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item";
        if (todo.completed) todoDiv.classList.add("completed");

        todoDiv.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <h5 class="mb-1">${todo.title}</h5>
                    <p class="mb-2 text-muted">${todo.description || ""}</p>

                    <div class="d-flex gap-2 flex-wrap">
                        ${todo.date ? `<span class="badge badge-light">
                            <i class="bi bi-calendar"></i> Due: ${todo.date}
                        </span>` : ""}

                        ${todo.fileName ? `<span class="badge bg-secondary">
                            <i class="bi bi-paperclip"></i> ${todo.fileName}
                        </span>` : ""}
                    </div>
                </div>

                <div class="d-flex gap-2">
                    <button class="btn action-btn btn-checkmark ${todo.completed ? "active" : ""}" data-id="${todo.id}">
                        <i class="bi bi-check-lg"></i>
                    </button>
                    <button class="btn action-btn btn-edit" data-id="${todo.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn action-btn btn-delete" data-id="${todo.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>

            <small class="text-muted">Created: ${todo.created.split("T")[0]}</small>
        `;

        todoList.appendChild(todoDiv);
    });
}

// CLICK EVENTS (Event Delegation)
todoList.addEventListener("click", function (e) {

    const id = Number(e.target.closest("button")?.dataset.id);
    if (!id) return;

    const todo = todos.find(t => t.id === id);

    if (e.target.closest(".btn-checkmark")) {
        todo.completed = !todo.completed;
    }

    if (e.target.closest(".btn-delete")) {
        todos = todos.filter(t => t.id !== id);
    }

    if (e.target.closest(".btn-edit")) {
        titleInput.value = todo.title;
        descriptionInput.value = todo.description;
        dateInput.value = todo.date;
        todos = todos.filter(t => t.id !== id);
    }

    saveTodos();
    renderTodos();
});

// FILTER CHANGE
filterSelect.addEventListener("change", renderTodos);

// SORT CHANGE
sortSelect.addEventListener("change", renderTodos);