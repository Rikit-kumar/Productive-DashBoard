// const plannerInputs = document.querySelectorAll(".planner-item input");

// function savePlanner() {
//   const plannerData = [];

//   plannerInputs.forEach((input) => {
//     plannerData.push(input.value.trim());
//   });

//   saveData("planner", plannerData);
// }

// function loadPlanner() {
//   const plannerData = getData("planner") || [];

//   plannerInputs.forEach((input, index) => {
//     input.value = plannerData[index] || "";
//   });
// }

// plannerInputs.forEach((input) => {
//   input.addEventListener("input", () => {
//     savePlanner();
//   });
// });

// loadPlanner();

// ---------------------------------------------------------------------------

const plannerList = document.querySelector("#plannerList");
const addPlannerSlot = document.querySelector("#addPlannerSlot");

let planner = getData("planner") || [];

function savePlanner() {
  saveData("planner", planner);
}

function renderPlanner() {
  plannerList.innerHTML = "";

  if (planner.length === 0) {
    plannerList.innerHTML = `
            <div class="empty-planner">

                <i class="ri-calendar-line"></i>

                <p>No planner slots yet.</p>

            </div>
        `;

    return;
  }

  planner.forEach((item) => {
    const row = document.createElement("div");
    row.className = "planner-item";
    row.dataset.id = item.id;

    row.innerHTML = `
            <input
                type="time"
                class="planner-time"
                value="${item.time || ""}"
            >

            <input
                type="text"
                class="planner-task"
                placeholder="Enter your task..."
                value="${item.task || ""}"
            >

            <button class="delete-slot">
                <i class="ri-delete-bin-6-line"></i>
            </button>
        `;

    plannerList.appendChild(row);
  });
}

function addSlot() {
  planner.push({
    id: Date.now(),
    time: "",
    task: "",
  });

  savePlanner();
  renderPlanner();

  const lastTask = plannerList.querySelector(
    ".planner-item:last-child .planner-task",
  );

  if (lastTask) {
    lastTask.focus();
  }
}

addPlannerSlot.addEventListener("click", addSlot);

renderPlanner();

function sortPlanner() {
  planner.sort((a, b) => {
    if (a.time === "") return 1;
    if (b.time === "") return -1;

    return a.time.localeCompare(b.time);
  });
}

plannerList.addEventListener("input", (e) => {
  const row = e.target.closest(".planner-item");

  if (!row) return;
  const id = Number(row.dataset.id);
  const item = planner.find((task) => task.id === id);
  if (!item) return;

  if (e.target.classList.contains("planner-time")) {
    item.time = e.target.value;
  }

  if (e.target.classList.contains("planner-task")) {
    item.task = e.target.value.trim();
  }

  sortPlanner();
  savePlanner();
});

plannerList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-slot");

  if (!deleteBtn) return;

  const row = deleteBtn.closest(".planner-item");
  const id = Number(row.dataset.id);

  planner = planner.filter((item) => item.id !== id);
  savePlanner();
  renderPlanner();
});

plannerList.addEventListener("keydown", (e) => {
  if (e.target.classList.contains("planner-task") && e.key === "Enter") {
    e.preventDefault();

    addSlot();
  }
});

// console.log(getData("planner"));
