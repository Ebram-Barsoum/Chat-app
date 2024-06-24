/* eslint-disable no-undef */
// jest.config.js
module.exports = {
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    coverageReporters: ['text']
};
