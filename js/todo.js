const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const todoList = document.querySelector("#todoList");

const taskCounter = document.querySelector("#taskCounter");
const clearCompleted = document.querySelector("#clearCompleted");

let tasks = getData("tasks") || [];

function saveTasks() {
  saveData("tasks", tasks);
}

function renderTasks() {
  todoList.innerHTML = "";

  if (tasks.length === 0) {
    todoList.innerHTML = `
        <div class="empty-todo">
            <i class="ri-checkbox-circle-line"></i>
            <p>No tasks yet.</p>
        </div>
    `;

    updateCounter();
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");

    li.className = "todo-item";
    li.dataset.id = task.id;

    li.innerHTML = `
            <div class="task-left">

                <input
                    type="checkbox"
                    class="task-check"
                    ${task.completed ? "checked" : ""}
                >

                <span class="task-title" contenteditable="false">
                    ${task.title}
                </span>

            </div>

            <div class="task-actions">
                <button class="edit-task">
                    <i class="ri-edit-line"></i>
                </button>

                <button class="delete-task">
                    <i class="ri-delete-bin-6-line"></i>
                </button>
            </div>
        `;

    if (task.completed) {
     li.querySelector(".task-title").classList.add("completed");
    }

    todoList.appendChild(li);
});

updateCounter();
}

updateCounter();

todoList.addEventListener("click", (e) => {
  const item = e.target.closest(".todo-item");
  if (!item) return;

  const id = Number(item.dataset.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) return;

  if (e.target.closest(".delete-task")) {
    tasks = tasks.filter((task) => task.id !== id);

    saveTasks();
    renderTasks();
    return;
  }

  if (e.target.closest(".edit-task")) {
    const title = item.querySelector(".task-title");
    title.contentEditable = "true";
    title.focus();
  }
});

function addTask() {
  const title = taskInput.value.trim();

  if (title === "") {
    alert("Please enter a task.");
    return;
  }

  const alreadyExists = tasks.some(
    (task) => task.title.toLowerCase() === title.toLowerCase(),
  );

  if (alreadyExists) {
    alert("Task already exists.");
    return;
  }

  tasks.push({
    id: Date.now(),
    title,
    completed: false,
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks();

function updateCounter() {
  const completed = tasks.filter((task) => task.completed).length;
  taskCounter.textContent = `${completed} / ${tasks.length} Completed`;
}

todoList.addEventListener("change", (e) => {
  if (!e.target.classList.contains("task-check")) return;

  const item = e.target.closest(".todo-item");
  const id = Number(item.dataset.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) return;

  task.completed = e.target.checked;

  saveTasks();
  renderTasks();
  updateCounter();
});

clearCompleted.addEventListener("click", () => {

  console.log(tasks);
  tasks = tasks.filter((task) => !task.completed);

  saveTasks();
  renderTasks();
  updateCounter();
});

todoList.addEventListener(
  "blur",
  (e) => {
    if (!e.target.classList.contains("task-title")) return;

    const item = e.target.closest(".todo-item");
    const id = Number(item.dataset.id);
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const value = e.target.textContent.trim();

    if (value !== "") {
      task.title = value;
    }

    e.target.contentEditable = false;
    saveTasks();
    renderTasks();
  },
  true,
);
