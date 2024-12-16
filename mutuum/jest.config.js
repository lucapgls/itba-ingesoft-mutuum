module.exports = {
    preset: "jest-expo",
    transform: {
      "^.+\\.tsx?$": "babel-jest",
    },
    moduleNameMapper: {
      "^@env$": "<rootDir>/path/to/your/env/mock.js",
    },
    testEnvironment: "node",
  };
  