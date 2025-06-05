let questions = [];
let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score-value");

function loadQuestion() {
  const current = questions[currentIndex];
  questionEl.textContent = `Câu ${currentIndex + 1}: ${current.question}`;
  answersEl.innerHTML = "";

  for (const [key, value] of Object.entries(current.options)) {
    const btn = document.createElement("button");
    btn.textContent = `${key}: ${value}`;
    btn.onclick = () => selectAnswer(btn, key);
    answersEl.appendChild(btn);
  }
}

function selectAnswer(button, selectedKey) {
  const correctKey = questions[currentIndex].answer;
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach(btn => {
    const key = btn.textContent.charAt(0);
    if (key === correctKey) {
      btn.classList.add("correct");
    }
    if (key === selectedKey && key !== correctKey) {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (selectedKey === correctKey) score++;
  scoreEl.textContent = ((score / questions.length) * 10).toFixed(2);

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      showFinalScore();
    }
  }, 2000);
}

function showFinalScore() {
  questionEl.textContent = "Hoàn thành bài kiểm tra!";
  answersEl.innerHTML = "";
  scoreEl.innerHTML = ((score / questions.length) * 10).toFixed(2);
}

fetch("qPOS361.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(err => {
    questionEl.textContent = "Không thể tải dữ liệu câu hỏi.";
    console.error("Lỗi nạp JSON:", err);
  });
