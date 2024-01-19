const nextJest = require("next/jest")
/** @type {import('ts-jest').JestConfigWithTsJest} */
/** @type {import("jest").Config} */

const createJestConfig = nextJest({
  dir: "./"
})
const customJestConfig = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "jest-environment-jsdom"
}
module.exports = createJestConfig(customJestConfig)
