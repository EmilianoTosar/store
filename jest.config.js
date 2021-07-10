module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: [
    "<rootDir>/cypress/",
    "<rootDir>/.next/",
    "<rootDir>/node_modules/"
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  globals: {
    "ts-jest": {
      tsconfig: "./jest/tsconfig.json"
    }
  }
};