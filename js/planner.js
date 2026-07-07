const plannerInputs = document.querySelectorAll(".planner-item input");

function savePlanner() {
  const plannerData = [];

  plannerInputs.forEach((input) => {
    plannerData.push(input.value.trim());
  });

  saveData("planner", plannerData);
}

function loadPlanner() {
  const plannerData = getData("planner") || [];

  plannerInputs.forEach((input, index) => {
    input.value = plannerData[index] || "";
  });
}

plannerInputs.forEach((input) => {
  input.addEventListener("input", () => {
    savePlanner();
  });
});

loadPlanner();
