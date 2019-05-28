const { defaults: tsjPreset } = require("ts-jest/presets")
const { pathsToModuleNameMapper } = require("ts-jest/utils")
const { compilerOptions } = require("./tsconfig.test.json")

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/setupEnzyme.ts"],
  transform: {
    ...tsjPreset.transform,
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>" }),
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
}
