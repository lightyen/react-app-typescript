const { defaults: tsjPreset } = require("ts-jest/presets")
const { pathsToModuleNameMapper } = require("ts-jest/utils")
const path = require("path")
const tsconfig = require("./tsconfig.test.json")

// NOTE: require nodejs v12.x.x
const mapper = Object.fromEntries(
  Object.entries(pathsToModuleNameMapper(tsconfig.compilerOptions.paths)).map(e => [e[0], path.resolve(e[1])]),
)

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    ...tsjPreset.transform,
  },
  moduleNameMapper: {
    "\\.(css|scss)$": path.resolve("src/__mocks__/styleMock.js"),
    ...mapper,
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
}
