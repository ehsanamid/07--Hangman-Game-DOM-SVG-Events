const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongletters = [];

function displayWord() {
  wordEl.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ""}
                </span>
            `
          )
          .join("")}
    `;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
}

function updateWrongLettersEL() {
  wrongLettersEl.innerHTML = `
  ${wrongletters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongletters.map((letter) => `<sapn>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongletters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  if (wrongletters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
}

function showNotifocation() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotifocation();
      }
    } else {
      if (!wrongletters.includes(letter)) {
        wrongletters.push(letter);

        updateWrongLettersEL();
      } else {
        showNotifocation();
      }
    }
  }
});

playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongletters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEL();
  popup.style.display = "none";
});

displayWord();
