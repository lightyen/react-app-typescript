const { defaults: tsjPreset } = require("ts-jest/presets")
const { pathsToModuleNameMapper } = require("ts-jest/utils")
const path = require("path")
const tsconfig = require("./tsconfig.test.json")

function getMapper() {
  const arr = Object.entries(pathsToModuleNameMapper(tsconfig.compilerOptions.paths)).map(e => [
    e[0],
    path.resolve(e[1]),
  ])
  const mapper = {}
  for (let i = 0; i < arr.length; i++) {
    mapper[arr[i][0]] = arr[i][1]
  }
  return mapper
}

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    ...tsjPreset.transform,
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
    ...getMapper(),
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
}
