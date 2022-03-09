function Person() {
  this.age = 0;
  
  setInterval(() => {
    this.age++; // 'this' funcționează cum trebuie aici, deoarece acest arrow function nu are propriul 'this'
  }, 1000);
}