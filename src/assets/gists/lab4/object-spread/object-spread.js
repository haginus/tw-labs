const defaultOptions = {
  darkMode: true,
  itemsPerPage: 10,
  language: "en-US"
}

const userOptions = {
  itemsPerPage: 50,
  language: "ro-RO"
}

// Se va crea un obiect cu proprietățile celor două obiecte.
// În cazul în care există proprietăți cu același nume, valorile acestora
// vor fi suprascrise de obiectul spread-uit la urmă.
const options = { ...defaultOptions, ...userOptions };

console.log(options);

// Același rezultat, cu Object.assing()
const options2 = {};
Object.assign(options2, defaultOptions);
Object.assign(options2, userOptions);

console.log(options2);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Mecanism similar și pentru array-uri.
const concatenated = [...arr1, ...arr2, 7, 8];

console.log(concatenated);