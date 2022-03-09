let arr = [
  { id: 1, name: "Andrew" },
  { id: 2, name: "Alex" },
  { id: 3, name: "Jane" },
]

let dict = arr.reduce((acc, el) => {
  acc[el.id] = el;
  return acc;
}, {});

console.log(dict);