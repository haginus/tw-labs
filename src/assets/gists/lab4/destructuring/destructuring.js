const student = {
  firstName: "John",
  lastName: "Doe",
  age: 22
}

// Destructurarea unui obiect
// Luăm doar proprietățile de care avem nevoie
// Putem redenumi variabilele specificând întâi numele proprietății, ':' și numele dorit
let { firstName, age: studentAge } = student;

console.log(`${firstName} are ${studentAge} de ani.`);

// Alternativ, puteam face afișarea de mai sus folosind direct proprietățile obiectului
console.log(`${student.firstName} are ${student.age} de ani.`);


const arr = [1, 2, 3, 4];

// Destructurarea unui array
const [firstElement, secondElement, thirdElement] = arr;

console.log("Primele 2 elemente ale array-ului sunt: ", firstElement, secondElement);

