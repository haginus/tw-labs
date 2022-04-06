let seconds = 0;
let intervalId = null;

function toggleInterval() {
  const stop = intervalId != null;
  document.querySelector('button').textContent = stop ? 'Rezumă' : 'Pauză';
  if(stop) {
    clearInterval(intervalId);
    intervalId = null;
  } else {
    intervalId = setInterval(() => {
      seconds++;
      document.querySelector('p').textContent = `Stai pe această pagină de ${seconds} secunde.`;
    }, 1000);
  }
}

window.onload = () => {
  toggleInterval();
  document.querySelector('button').addEventListener('click', toggleInterval);
}