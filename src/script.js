import '@babel/polyfill';
import { performance } from 'perf_hooks';


async function promiseAll(promises) {
  const results = []
  for (const promise of promises) {
    try {
      const result = await promise
      results.push(result)
    } catch (error) {
      throw error;
    }
  }
  return results
}

async function promiseRace(promises) {
  return new Promise((res, rej) => {
    for (const promise of promises) {
      promise.then(res).catch(rej)
    }
  })
}

// Wyłącza warningi o unhandled promise
process.on('unhandledRejection', () => { });
process.on('rejectionHandled', () => { });

// Kod testowy.
promiseAll([]).then(result => {
  console.log('To powinien być []:', JSON.stringify(result));
});

promiseAll([futureSuccess(1), futureSuccess(2), futureSuccess(3)]).then(result => {
  console.log('To powinien być [1, 2, 3]:', result);
});

promiseAll([futureSuccess(1), Promise.reject('X'), futureSuccess(3)])
  .then(() => {
    console.log('WAT?! Nie powinno nas tu być..');
  })
  .catch(error => {
    if (error !== 'X') {
      console.log('Coś poszło nie tak..:', error);
    }
    console.log('To powinien być X:', error);
  });

promiseRace([1, 2, 3]).then(result => {
  console.log('This should be 1:', result);
});

const now = performance.now();
promiseRace([delayedSuccess(1, 300), delayedSuccess(2, 200), delayedSuccess(3, 100)]).then(result => {
  const after = performance.now();
  const diff = after - now;
  if (diff < 100) {
    throw 'Za szybko!'
  }
  if (diff >= 200) {
    throw 'Za wolno!'
  }
  console.log('To powinno być 3:', result);
}).catch(error => console.log(error));

promiseRace([futureSuccess(1), Promise.reject('X'), futureSuccess(3)])
  .then(() => {
    console.log('WAT?! Nie powinno nas tu być..');
  })
  .catch(error => {
    if (error !== 'X') {
      console.log('Coś poszło nie tak..:', error);
    }
    console.log('To powinien być X:', error);
  });

function futureSuccess(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
};

function delayedSuccess(val, time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), time);
  });
};
