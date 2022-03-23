window.onload = () => {
  document.getElementById('noCapture')
    .addEventListener('focus', consoleLogFocus);
  
  document.getElementById('capture')
    .addEventListener('focus', consoleLogFocus, true);
}

function consoleLogFocus(event) {
  // afișăm textul din nod (trim șterge spațiile)
  const content = event.target.firstChild.textContent.trim();
  console.log(`S-a focusat elementul cu textul '${content}'`);
}