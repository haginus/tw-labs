const promise1 = new Promise((resolve, reject) => {
  resolve('promise 1 fullfilled');
});

const promise2 = new Promise((resolve, reject) => {
  resolve('promise 2 fullfilled');
});

const promise3 = new Promise((resolve, reject) => {
  reject('promise 3 error');
});

Promise.allSettled([promise1, promise2, promise3]).then(result => {
  console.log(result);
});