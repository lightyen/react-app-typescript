import { defaults as tsjPreset } from "ts-jest/presets"
import { pathsToModuleNameMapper } from "ts-jest/utils"
import { compilerOptions } from "./tsconfig.test.json"

const config: jest.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFiles: ["<rootDir>/setupEnzyme.ts"],
    collectCoverage: true,
    coverageDirectory: "<rootDir>/test/coverage",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/src/__mocks__/fileMock.ts",
        "\\.(css|less|scss)$": "<rootDir>/src/__mocks__/styleMock.ts",
        ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>" }),
    },
    transform: {
        ...tsjPreset.transform,
    },
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.test.json",
        },
    },
}

module.exports = config
