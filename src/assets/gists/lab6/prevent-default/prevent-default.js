window.onload = () => {
  document.getElementById('firstInput').addEventListener('keydown', showKey);
  document.getElementById('secondInput').addEventListener('keydown', showKeyPreventDefault);
}

function showKey(event) {
  const resultEl = document.getElementById('result');
  resultEl.innerHTML = `Ai apăsat: <code>${event.key}</code>`;
}

function showKeyPreventDefault(event) {
  event.preventDefault();
  showKey(event);
}