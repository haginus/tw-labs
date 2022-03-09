function Car(make, model, power) {
  this.make = make;
  this.model = model;
  this.power = power;
  this.start = function() {
    return "vrummm";
  }
}

let myCar = new Car("Volkswagen", "Golf 6", 140);