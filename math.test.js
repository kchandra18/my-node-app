// math.test.js - Test cases for math.js functions
// Jest automatically finds files ending with .test.js

// Import the functions we want to test
const { add, subtract, multiply, divide } = require('./math');

// Group 1: Tests for add function
describe('add function', () => {

    // Test 1: Basic addition
    test('should add two positive numbers', () => {
        expect(add(2, 3)).toBe(5);
    });

    // Test 2: Adding negative numbers
    test('should add negative numbers', () => {
        expect(add(-1, -2)).toBe(-3);
    });

    // Test 3: Adding zero
    test('should add zero correctly', () => {
        expect(add(5, 0)).toBe(5);
    });
});

// Group 2: Tests for subtract function
describe('subtract function', () => {

    // Test 1: Basic subtraction
    test('should subtract two numbers', () => {
        expect(subtract(10, 5)).toBe(5);
    });

    // Test 2: Subtracting larger from smaller
    test('should return negative when subtracting larger from smaller', () => {
        expect(subtract(3, 7)).toBe(-4);
    });
});

// Group 3: Tests for multiply function
describe('multiply function', () => {

    // Test 1: Basic multiplication
    test('should multiply two numbers', () => {
        expect(multiply(3, 4)).toBe(12);
    });

    // Test 2: Multiplying by zero
    test('should return zero when multiplying by zero', () => {
        expect(multiply(5, 0)).toBe(0);
    });
});

// Group 4: Tests for divide function
describe('divide function', () => {

    // Test 1: Basic division
    test('should divide two numbers', () => {
        expect(divide(10, 2)).toBe(5);
    });

    // Test 2: Dividing by zero should throw error
    test('should throw error when dividing by zero', () => {
        expect(() => divide(10, 0)).toThrow('Cannot divide by zero!');
    });
});