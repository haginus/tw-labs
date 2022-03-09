// Număr random între 0 și 100
let propertyName = Math.floor(Math.random() * 100);
let otherPropertyName = Math.floor(Math.random() * 100);

const myObject = { 
  [propertyName]: 'someValue',
  [otherPropertyName]: 'someOtherValue',
  someProperty: 2 
};

console.log(myObject);

// Alternativ, dacă nu cunoșteam această sintaxă, trebuia să setăm proprietățile separat
myObject[propertyName] = 'someValue2';
myObject[otherPropertyName] = 'someOtherValue2';

console.log(myObject);