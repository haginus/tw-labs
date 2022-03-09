let a = 22;
var b = 34;

if(true) {
  console.log(a, b); // ambele variabile sunt accesibile de aici
  var x = 'hello!';
  let y = 'goodbye.';
}

console.log(x); // x este accesibil de aici
console.log(y); // y nu este accebil, acest statement va arunca o eroare.