const person = {
  firstName: "John",
  lastName: "Doe",
  age: 22
}

let message = `Hello, ${person.firstName} ${person.lastName}!` +
  ` You ${person.age >= 18 ? 'are' : 'are NOT'} over 18 years old.`;

console.log(message);