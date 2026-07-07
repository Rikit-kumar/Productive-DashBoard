const city = document.querySelector("#city");
const temp = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const icon = document.querySelector("#weatherIcon");

const API_KEY = "7709053c86d44db386231353260707";
const CITY = "Delhi";
const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`;

function getLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      getWeather(latitude, longitude);
    },

    (error) => {
      console.log(error);

      city.textContent = "Location Denied";
      condition.textContent = "Allow location permission.";
    },
  );
}

async function getWeather(lat, lon) {
  const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    console.log(error);
    city.textContent = "Not Found";
    temperature.textContent = "--°C";
    condition.textContent = "Unable to fetch weather.";
  }
}

function updateWeatherUI(data) {
  city.textContent = data.location.name;
  temperature.textContent = `${data.current.temp_c}°C`;
  condition.textContent = data.current.condition.text;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_kph} km/h`;
  const weather = data.current.condition.text.toLowerCase();

  if (weather.includes("sunny") || weather.includes("clear")) {
    weatherIcon.className = "ri-sun-line weather-icon";
  } else if (weather.includes("cloud")) {
    weatherIcon.className = "ri-cloudy-line weather-icon";
  } else if (weather.includes("rain")) {
    weatherIcon.className = "ri-rainy-line weather-icon";
  } else if (weather.includes("snow")) {
    weatherIcon.className = "ri-snowy-line weather-icon";
  } else if (weather.includes("storm")) {
    weatherIcon.className = "ri-thunderstorms-line weather-icon";
  } else {
    weatherIcon.className = "ri-cloud-line weather-icon";
  }
}

getLocation();
