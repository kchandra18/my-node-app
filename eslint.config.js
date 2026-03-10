// eslint.config.js - ESLint configuration for Node.js project
import js from '@eslint/js';

export default [
    // Use ESLint recommended rules as base
    js.configs.recommended,
    {
        // Apply these rules to all JavaScript files
        files: ['**/*.js'],

        // Define the environment
        languageOptions: {
            // Use ES2021 features
            ecmaVersion: 2021,
            // Use ES modules
            sourceType: 'module',
            // Define global variables
            globals: {
                // Node.js globals
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                process: 'readonly',
                console: 'readonly',
            }
        },

        // Custom rules
        rules: {
            // No variables declared but never used
            'no-unused-vars': 'error',
            // Avoid console.log in production code
            'no-console': 'warn',
            // Always use === not ==
            'eqeqeq': 'error',
            // Never use var
            'no-var': 'error',
            // Use const when variable never changes
            'prefer-const': 'error',
            // Always add semicolons
            'semi': ['error', 'always'],
            // Always use single quotes
            'quotes': ['error', 'single'],
        }
    },
    {
        // Special rules for test files
        files: ['**/*.test.js'],
        languageOptions: {
            globals: {
                // Jest globals
                describe: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
            }
        }
    }
];