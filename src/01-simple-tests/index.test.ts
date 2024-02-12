// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const counting = simpleCalculator({ a: 10, b: 2, action: Action.Add });
    const result = 12;
    expect(counting).toBe(result);
  });

  test('should subtract two numbers', () => {
    const counting = simpleCalculator({ a: 10, b: 2, action: Action.Subtract });
    const result = 8;
    expect(counting).toBe(result);
  });

  test('should multiply two numbers', () => {
    const counting = simpleCalculator({ a: 10, b: 2, action: Action.Multiply });
    const result = 20;
    expect(counting).toBe(result);
  });

  test('should divide two numbers', () => {
    const counting = simpleCalculator({ a: 10, b: 2, action: Action.Divide });
    const result = 5;
    expect(counting).toBe(result);
  });

  test('should exponentiate two numbers', () => {
    const counting = simpleCalculator({ a: 10, b: 2, action: Action.Exponentiate });
    const result = 100;
    expect(counting).toBe(result);
  });

  test('should return null for invalid action', () => {
    const counting = simpleCalculator({ a: 10, b: 2, action: 'invalidAction' });
    const result = null;
    expect(counting).toBe(result);
  });

  test('should return null for invalid arguments', () => {
    const counting1 = simpleCalculator({ a: 10, b: 'b', action: Action.Exponentiate });
    const result1 = null;
    expect(counting1).toBe(result1);
    const counting2 = simpleCalculator({ a: 'a', b: 'b', action: Action.Divide });
    const result2 = null;
    expect(counting2).toBe(result2);
  });
});
