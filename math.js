// math.js - Simple math functions for our Node.js app

// Function to add two numbers
function add(a, b) {
    return a + b;
}

// Function to subtract two numbers
function subtract(a, b) {
    return a - b;
}

// Function to multiply two numbers
function multiply(a, b) {
    return a * b;
}

// Function to divide two numbers
function divide(a, b) {
    // Check if dividing by zero
    if (b === 0) {
        throw new Error('Cannot divide by zero!');
    }
    return a / b;
}

// Export all functions so other files can use them
module.exports = { add, subtract, multiply, divide };