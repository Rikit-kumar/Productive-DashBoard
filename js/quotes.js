const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const refBtn = document.querySelector('#newQuote');

const quotes = [
  {
    quote: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    quote: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln",
  },
  {
    quote: "Dream big and dare to fail.",
    author: "Norman Vaughan",
  },
  {
    quote: "Do something today that your future self will thank you for.",
    author: "Unknown",
  },
  {
    quote: "Your only limit is your mind.",
    author: "Unknown",
  },
  {
    quote: "Small progress is still progress.",
    author: "Unknown",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    quote: "Great things never come from comfort zones.",
    author: "Unknown",
  },
  {
    quote: "Stay positive, work hard, make it happen.",
    author: "Unknown",
  },
  {
    quote: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  }
];

let lastIndex = -1;

function getQuote() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;
    quote.textContent = `"${quotes[randomIndex].quote}"`;
    author.textContent = `— ${quotes[randomIndex].author}`;
}

refBtn.addEventListener("click", getQuote);

getQuote();