window.onload = () => {
  const box = document.querySelector(".box");
  showDomRect(box);
  window.addEventListener("scroll", () => {
    showDomRect(box);
  });
};

function showDomRect(element) {
  const rect = element.getBoundingClientRect();
  element.innerHTML = '';
  for(let key in rect) {
    if(typeof rect[key] == 'function') continue;
    let paragraph = document.createElement("p");
    paragraph.textContent = `${key}: ${rect[key]}px`;
    element.append(paragraph);
  }
}