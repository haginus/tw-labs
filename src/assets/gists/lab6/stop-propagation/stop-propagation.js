window.onload = () => {
  const divs = document.querySelectorAll('div');
  addNestedListeners(divs[0]);
  addNestedListeners(divs[1], true);
}

function addNestedListeners(element, stopPropapagation = false) {
  const handler = stopPropapagation ? alertElementStopPropagation : alertElement;
  element.addEventListener("click", handler);
  element.querySelectorAll("*").forEach(child => {
    child.addEventListener("click", handler);
  });
}

function alertElement(event) {
  alert(event.currentTarget.tagName);
}

function alertElementStopPropagation(event) {
  event.stopPropagation();
  alertElement(event);
}