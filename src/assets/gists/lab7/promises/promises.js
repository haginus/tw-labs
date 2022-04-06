const promise1 = new Promise((resolve, reject) => {
  resolve('promise 1 fullfilled');
});

const promise2 = new Promise((resolve, reject) => {
  resolve('promise 2 fullfilled');
});

const promise3 = new Promise((resolve, reject) => {
  reject('promise 3 error');
});

promise1
  .then(result => console.log(result))
  .catch(error => console.log(error));

promise2
  .then(result => console.log(result))
  .catch(error => console.log(error));

promise3
  .then(result => console.log(result))
  .catch(error => console.log(error));

console.log('Main thread things');