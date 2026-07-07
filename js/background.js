const backgroundCard = document.querySelector(".background-card");
const bgGreeting = document.querySelector("#bgGreeting");
const bgMessage = document.querySelector("#bgMessage");

const backgrounds = {
  morning: {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    greeting: "Good Morning 🌤",
    message: "Start your day with energy and positivity.",
  },

  afternoon: {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    greeting: "Good Afternoon ☀",
    message: "Keep your momentum going and stay productive.",
  },

  evening: {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    greeting: "Good Evening 🌇",
    message: "Finish your goals before the day ends.",
  },

  night: {
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
    greeting: "Good Night 🌙",
    message: "Relax, reflect, and prepare for tomorrow.",
  },
};

function updateBackground() {
  const hour = new Date().getHours();
  let current;

  if (hour >= 5 && hour < 12) {
    current = backgrounds.morning;
  } else if (hour >= 12 && hour < 17) {
    current = backgrounds.afternoon;
  } else if (hour >= 17 && hour < 20) {
    current = backgrounds.evening;
  } else {
    current = backgrounds.night;
  }

  backgroundCard.style.backgroundImage = `url(${current.image})`;

  bgGreeting.textContent = current.greeting;
  bgMessage.textContent = current.message;
}

updateBackground();
