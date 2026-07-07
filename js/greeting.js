const greetingName = document.querySelector(".greeting-name");

function ShowName() {
  let user = getData("name");

  if (user) {
    greetingName.textContent = user;
    return;
  }

  do {
    userName = prompt("Enter your name");

    if (userName === null) {
      return;
    }
    userName = userName.trim();

    if (userName === "") {
      alert("Please enter a valid name.");
    }
  } while (userName === "");

  greetingName.textContent = userName;
  saveData("name", userName);
}

greetingName.addEventListener("dblclick", () => {
  let newName;

  do {
    newName = prompt("Enter your new name");

    if (newName === null) {
      return;
    }

    newName = newName.trim();
    if (newName === "") {
      alert("Please enter a valid name.");
    }

  } while (newName === "");

  greetingName.textContent = newName;
  saveData("name", newName);
});

ShowName();
