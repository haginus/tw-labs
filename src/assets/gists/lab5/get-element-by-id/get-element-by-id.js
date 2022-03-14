window.onload = () => {
  const touchCountElement = document.getElementById('touchCount');
  const button = document.getElementById('touchButton');
  button.onclick = () => {
    // preluăm și modificăm conținutul HTML unde stocăm numărul de apăsări
    let count = parseInt(touchCountElement.innerHTML);
    touchCountElement.innerHTML = count + 1;
  };
}