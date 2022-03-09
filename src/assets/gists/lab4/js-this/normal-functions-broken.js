function Person() {
  this.age = 0;
  
  setInterval(function growUp() {
    // Acest exemplu nu va funcționa, deoarece 'this' referențiază
    // obiectul propriu al funcției growUp, ceea ce nu va dermina 
    // schimbarea vârstei din obiectul Person.
    this.age++;
  }, 1000);
}