const { defaults: tsjPreset } = require("ts-jest/presets")
const { pathsToModuleNameMapper } = require("ts-jest/utils")
const tsconfig = require("./tsconfig.test.json")

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    ...tsjPreset.transform,
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: "<rootDir>" }),
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
}
