// codebreaker.js
const input = document.getElementById("input");
const output = document.getElementById("output");
const typeSFX = document.getElementById("type-sfx");
const successSFX = document.getElementById("success-sfx");
const failSFX = document.getElementById("fail-sfx");

const words = ["firewall", "exploit", "payload", "cipher", "terminal", "malware"];
let currentWord = "";

function play(sfx) {
  sfx.currentTime = 0;
  sfx.play();
}

function getReversedWord(word) {
  return word.split("").reverse().join("");
}

function newChallenge() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  output.innerText += `\n[⚠] Decode this: ${getReversedWord(currentWord)}\n> `;
}

input.addEventListener("input", () => play(typeSFX));

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const answer = input.value.trim().toLowerCase();
    input.value = "";

    if (answer === currentWord) {
      output.innerText += `${answer} ✅\n[✔] Correct! New code incoming...\n`;
      play(successSFX);
      setTimeout(() => {
        output.innerText += "\n";
        newChallenge();
      }, 1000);
    } else {
      output.innerText += `${answer} ❌\n[!] Try again\n> `;
      play(failSFX);
    }
  }
});

// Init
output.innerText = "[Codebreaker Terminal]\n";
newChallenge();
input.focus();
