import { fib } from "../src/fib";

describe('Fibonacci function', () => {

  it(`should throw error when given non-integer argument`, () => {
    expect(() => {
      fib('a')
    }).toThrow();
  })

  it(`should throw error when given negative integer`, () => {
    expect(() => {
      fib(-1)
    }).toThrow();
  })

  it(`should return number when number < 3`, () => {
    expect(
      fib(0)
    ).toEqual(0);
    expect(
      fib(1)
    ).toEqual(1);
  })

  it(`should return fib(n-1)+fib(n-2) when n >= 3`, () => {
    const fib1 = fib(3);
    const fib2 = fib(4);
    expect(fib(5)).toEqual(fib1 + fib2);
  })
})