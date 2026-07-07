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

  let hour = today.getHours();
  let min = String(today.getMinutes()).padStart(2, "0");
  let sec = String(today.getSeconds()).padStart(2, "0");

  let session = "AM";

  if(hour === 0){
    hour = 12;
  }else if(hour === 12){
    session = "PM";
  }else if(hour > 12){
    hour = hour - 12;
    session = "PM";
  }

  const fullTime = `${String(hour).padStart(2, "0")}:${min}:${sec} ${session}`;
  CurrentTime.textContent = fullTime;

  let greeting = "";

  if(today.getHours() < 12){
    greeting = "Good Morning";
  }else if(today.getHours() < 17){
    greeting = "Good Afternoon";
  }else{
    greeting = "Good Evening";
  }

  greetingAccTime.textContent = greeting
}

updateDateTime();
