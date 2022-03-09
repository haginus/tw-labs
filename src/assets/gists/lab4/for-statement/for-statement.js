const arr = [1, 2, 3];

for(let i = 0; i < arr.length; i++) {
  arr[i] *= 2;
}

console.log(arr)

for(let key in arr) {
  arr[key] *= 2;
}

console.log(arr)

for(let element of arr) {
  element *= 2;
}

console.log(arr)