const CurrentDate = document.querySelector("#date");
const CurrentTime = document.querySelector("#time");
const greetingAccTime = document.querySelector(".greeting-wish")

function updateDateTime() {
  const today = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = days[today.getDay()];
  const MonthName = months[today.getMonth()];
  const date = today.getDate();

  const fullDate = `${dayName}, ${MonthName}, ${date}`;
  CurrentDate.textContent = fullDate;

  const currentHour = today.getHours();
  let hour = currentHour;
  let min = String(today.getMinutes()).padStart(2, "0");
  let sec = String(today.getSeconds()).padStart(2, "0");

  let session = "AM";

  if(hour === 0){
    hour = 12;
  }else if(hour === 12){
    session = "PM";
  }else if(hour > 12){
    hour -= 12;
    session = "PM";
  }

  const fullTime = `${String(hour).padStart(2, "0")}:${min} ${session}`;
  CurrentTime.textContent = fullTime;

  let greeting = "";

  if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        greeting = "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

  greetingAccTime.textContent = greeting
}

updateDateTime();
setInterval(updateDateTime, 1000);
