const weatherTypes = ['soare', 'înnorat', 'ploaie', 'lapoviță', 'ninsoare'];
let tryNumber = 1;

function randomPick(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getWeather(city, successCallback, errCallback) {
  if(tryNumber % 3 == 0) {
    errCallback('Nu s-au putut contacta serverele de vreme.');
  } else {
    // simulăm un răspuns al serverului
    const weatherType = randomPick(weatherTypes);
    const temperature = randomInt(-20, 35);
    successCallback({
      weatherType,
      temperature,
      city
    });
  }
  tryNumber++;
}

function handleBtnClick() {
  getWeather("București", (result) => {
    console.log(`În ${result.city} este ${result.weatherType}, cu o temperatură de ${result.temperature}°C.`);
  }, (err) => {
    console.log(`Eroare: ${err}`);
  });
}

window.onload = () => {
  document.querySelector('button').addEventListener('click', handleBtnClick);
}