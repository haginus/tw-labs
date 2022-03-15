const news = [
  {
    title: "ANDREI DUBAN A AȘTEPTAT MINUTE BUNE DUPĂ COMANDĂ, FĂRĂ SĂ-ȘI PIARDĂ RĂBDAREA!",
    short_description: "Andrei Duban a slăbit considerabil după ce s-a lăsat pe mâna medicilor și și-a făcut operație de micșorare a stomacului, dar n-a renunțat la plăcerile culinare. Fast food-ul pare să fie încă preferatul actorului, chiar dacă militează pentru un stil de viață sănătos.",
    image: "andrei_duban_nu_isi_pierde_rabdarea.jpg",
    datePublished: "2022-03-15",
  },
  {
    title: "DORIAN POPA: “LA MINE NU SUNT BANII PE PRIMUL LOC!” “HÂTZ GIONULE” DEZVĂLUIE REȚETA SUCCESULUI ȘI A FERICIRII",
    short_description: "Deși este unul dintre cele mai energice și zâmbitoare personaje din showbiz, Dorian Popa nu a trecut prin momente tocmai ușoare, în copilărie, când mama sa a trebuit să îi crească de una singură pe cântăreț și pe fratele său, actualmente medic în Germania.",
    image: "dorian_popa_hatz_gionule.jpg",
    datePublished: "2022-03-14",
  },
  {
    title: 'BOMBA SEXY a lui Putin, dezvăluiri intime despre liderul de la Kremlin: "Îi...',
    short_description: "",
    image: "putin_ua.jpg",
    datePublished: "2022-03-15",
  }
];

const ROOT_URL = '/assets/gists/lab5/create-remove-elements/';

let newsIdx = 0;

window.onload = () => {
  document.getElementById('addNews').onclick = addNews;
  document.getElementById('removeNews').onclick = removeNews;
  document.getElementById('biggerFont').onclick = () => incrementFontSize(1);
  document.getElementById('smallerFont').onclick = () => incrementFontSize(-1);
}

function addNews() {
  const newsArticle = news[newsIdx];
  const articleElement = document.createElement('div');
  articleElement.classList.add('news-article');
  articleElement.title = 'Data publicării: ' +
    new Date(newsArticle.datePublished).toLocaleDateString();

  const articleContent = document.createElement('div');
  articleContent.classList.add('content');

  const h1 = document.createElement('h1');
  h1.textContent = newsArticle.title;

  const p = document.createElement('p');
  p.textContent = newsArticle.short_description;

  articleContent.append(h1, p);

  const img = document.createElement('img');
  img.src = ROOT_URL + newsArticle.image;

  articleElement.append(img, articleContent);

  document.querySelector('#newsContainer').append(articleElement);

  newsIdx = (newsIdx + 1) % news.length;
}

function removeNews() {
  document.querySelector('#newsContainer').lastChild?.remove();
}

function incrementFontSize(by) {
  const htmlEl = document.querySelector("html");
  const current = parseInt(htmlEl.style.fontSize) || 12;
  htmlEl.style.fontSize = (current + by) + "px";
}