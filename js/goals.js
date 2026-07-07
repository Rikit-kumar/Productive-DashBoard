const goalInput = document.querySelector("#goalInput");
const addGoalBtn = document.querySelector("#addGoal");
const goalList = document.querySelector("#goalList");
const goalProgress = document.querySelector("#goalProgress");
const progressFill = document.querySelector("#progressFill");

let goals = getData("goals") || [];

function renderGoals() {
  goalList.innerHTML = "";

  goals.forEach((goal, index) => {
    const li = document.createElement("li");

    const taskLeft = document.createElement("div");
    taskLeft.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = goal.completed;

    checkbox.addEventListener("change", () => {
      toggleGoal(index);
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = goal.text;

    if (goal.completed) {
      text.style.textDecoration = "line-through";
      text.style.opacity = "0.6";
    }

    taskLeft.append(checkbox, text);

    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    const deleteBtn = document.createElement("button");

    deleteBtn.innerHTML = `
            <i class="ri-delete-bin-6-line"></i>
        `;

    deleteBtn.addEventListener("click", () => {
      deleteGoal(index);
    });

    taskActions.appendChild(deleteBtn);

    li.append(taskLeft, taskActions);

    goalList.appendChild(li);
  });

  updateProgress();

  saveData("goals", goals);
}

function addGoal() {
  const text = goalInput.value.trim();

  if (text === "") {
    alert("Please enter a goal.");
    return;
  }

  goals.push({ text, completed: false });

  goalInput.value = "";
  renderGoals();
}

function deleteGoal(index) {
  goals.splice(index, 1);
  renderGoals();
}

function toggleGoal(index) {
  goals[index].completed = !goals[index].completed;
  renderGoals();
}

function updateProgress() {
  const completed = goals.filter((goal) => goal.completed).length;
  const total = goals.length;
  goalProgress.textContent = `${completed} / ${total} Completed`;

  let percentage = 0;
  
  if (total > 0) {
    percentage = (completed / total) * 100;
  }

  if (percentage === 100) {
    progressFill.style.background = "linear-gradient(90deg,#22c55e,#16a34a)";
  } else {
    progressFill.style.background = "linear-gradient(90deg,#6366f1,#8b5cf6)";
  }

  progressFill.style.width = `${percentage}%`;
}

addGoalBtn.addEventListener("click", addGoal);

goalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addGoal();
  }
});

renderGoals();
