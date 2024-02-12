// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 10, b: 2, action: Action.Subtract, expected: 8 },
    { a: 10, b: 2, action: Action.Multiply, expected: 20 },
    { a: 10, b: 2, action: Action.Divide, expected: 5 },
    { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
    { a: 10, b: 2, action: 'invalidAction', expected: null },
    { a: 10, b: 'b', action: Action.Exponentiate, expected: null }
]; 

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`Should calculate ${a} ${action} ${b}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  });
});
