const typingtext = document.querySelector(".typing-text p")
const inputField = document.querySelector('.wrapper .input-field')
const mistakeTag = document.querySelector(".mistake span");  
const timeTag = document.querySelector(".time span");
const wpmTag = document.querySelector(".wpm span ");
const cpmTag = document.querySelector(".cpm span ");
const tryAgainBtn = document.querySelector(".button");

let timer = 0;
let mistake = 0;
let maxTime = 60;
let timeLeft = maxTime;
let charindex = 0;
let isTyping = false;

function loadParagraph() {
    const paragraphs = [
      "The quick brown fox jumps over the lazy dog.",
      "Typing speed tests are a great way to improve your skills.",
      "JavaScript is a versatile programming language used for web development.",
      "Practice makes perfect, so keep typing to enhance your speed.",
      "Coding challenges can be both fun and educational.",
      "A journey of a thousand miles begins with a single step.",
      "Consistency is the key to mastering any skill.",
      "Debugging is an essential part of the software development process.",
      "Short sentences are easier to type quickly and accurately.",
      "Always strive for accuracy before focusing on speed."
    ];
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingtext.innerHTML = '';
  for(const char of paragraphs[randomIndex]){
    typingtext.innerHTML += `<span>${char}</span>`
  }
  typingtext.querySelectorAll("span")[0].classList.add("active")
  document.addEventListener("keydown", () => inputField.focus());
  typingtext.addEventListener("click", () => inputField.focus());
    
}
inputField.addEventListener("input", () => {
  const char = typingtext.querySelectorAll("span")
  const typedChar = inputField.value.charAt(charindex);
  if(!isTyping){
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }

  if (charindex < char.length && timeLeft > 0) {
    if (char[charindex].innerText === typedChar) {
      char[charindex].classList.add("correct");
    } else {
      mistake++;
      char[charindex].classList.add("incorrect");
    }
    charindex++;
    char[charindex].classList.add("active");
    mistakeTag.innerHTML = mistake;
  } else {
    clearInterval(timer);
    inputField.value = "";
    inputField.disabled = true; // Disable input field when typing is complete
  }

  // Stop the timer if the user finishes typing all characters
  if (charindex === char.length) {
    clearInterval(timer);
    inputField.disabled = true;
  }
});
function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerHTML = timeLeft;
    const wpm = Math.round(((charindex - mistake) / 5) / ((maxTime - timeLeft) / 60));
    const cpm = Math.round((charindex / 5) / ((maxTime - timeLeft) / 60));
    wpmTag.innerHTML = wpm;
    cpmTag.innerHTML = cpm;
  } else {
    clearInterval(timer);
    inputField.disabled = true;
  }
}
tryAgainBtn.addEventListener("click", () => {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charindex = 0;
  mistake = 0;
  isTyping = false;
  
  inputField.value = "";
  inputField.disabled = false; // Enable input field for new typing test
  mistakeTag.innerHTML = 0; 
  wpmTag.innerHTML = 0;
  cpmTag.innerHTML = 0;
});
loadParagraph();
