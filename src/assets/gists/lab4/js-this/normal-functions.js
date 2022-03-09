function Person() {
  this.age = 0;
  var self = this; // ținem minte într-o variabilă referința către 'this'
  
  setInterval(function growUp() {
    // folosim referința corectă
    self.age++;
  }, 1000);
}