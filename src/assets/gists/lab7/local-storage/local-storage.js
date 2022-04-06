window.onload = () => {
  const barButton = document.querySelector('.user-bar #changeDetails');
  const removeButton = document.querySelector('#removeDetails');
  const refreshButton = document.getElementById('refresh');
  barButton.addEventListener('click', changeDetails);
  removeButton.addEventListener('click', removeDetails);
  refreshButton.addEventListener('click', () => {
    window.location.reload();
  });
  renderBar();
}

function renderBar() {
  const barMessage = document.querySelector('.user-bar .message');
  const barButton = document.querySelector('.user-bar #changeDetails');
  let userDetails = null;
  try {
    userDetails = JSON.parse(localStorage.getItem('userDetails'));
  } catch (error) {
    userDetails = null;
  }
  if(userDetails) {
    barMessage.innerHTML = `Bine ai venit, ${userDetails.name}! Ai ${userDetails.age} ani.`;
    barButton.innerHTML = "Schimbă detaliile";
  } else {
    barMessage.innerHTML = "Bine ai venit! Nu știm nimic despre tine...";
    barButton.innerHTML = "Adăugă detalii";
  }
}

function changeDetails() {
  const name = prompt('Introdu numele tău');
  if(!name) return;
  const age = prompt('Introdu vârsta');
  if(!age) return;
  const userDetails = { name, age };
  localStorage.setItem('userDetails', JSON.stringify(userDetails));
  renderBar();
}

function removeDetails() {
  localStorage.removeItem('userDetails');
  renderBar();
}