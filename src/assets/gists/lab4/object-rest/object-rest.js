const student = {
  firstName: "John",
  lastName: "Doe",
  age: 22
};

// Obținem vârsta, iar celelalte proprietăți rămase sunt extrase într-un nou obiect
const { age, ...otherProperties } = student;

console.log(age);
console.log(Object.keys(otherProperties));

// Același lucru poate fi făcut și cu array-uri
const numbers = [1, 2, 3, 4];
const [firstNumber, ...leftNumbers] = numbers;

console.log(firstNumber);
console.log(leftNumbers);

// Putem folosi Object Rest și pentru funcții
// Primul argument al funcției este numărul cu care multiplicăm
// Restul argumentelor sunt cele multiplicate și returnate într-un array
function multiplyAll(multiplier, ...numbers) {
  return numbers.map((num) => num * multiplier);
}

console.log(multiplyAll(2, 0, 8, 16, 4));
