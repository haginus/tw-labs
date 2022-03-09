const multiply = (x, y) => x * y;

// Funcția multiply este ehivalentă cu:
const multiply2 = (x, y) => {
  return x * y;
}

console.log(multiply(2, 3), multiply2(2, 3));

// Este posibil să returnăm și obiecte, însă deoarece proprietățile unui obiect
// sunt definite între acolade, precum body-ul funcției, va fi nevoie să
// înconjurăm expresia de paranteze rotunde.
// Observați că dacă vrem ca numele proprietății să fie același cu cel al varibilei,
// putem simplifica sintaxa.
const createPersonObject = (name, age) => ({ name, age });

console.log(createPersonObject("John Doe", 34));
