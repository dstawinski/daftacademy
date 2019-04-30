

export const fib = (num) => {
  if (typeof num !== 'number' || Math.floor(num) !== num) throw Error('not int');
  if (num === 0 || num === 1) return num;
  else return fib(num - 1) + fib(num - 2);
}