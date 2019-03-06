// promises allow us to do something after a long running task is complete 


const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Something went wrong!');
    }, 5000);
});



console.log('before');

promise.then((data) => {
    console.log('1', data);
}).catch((error) => {
    console.log('error: ', error);
});

console.log('after');