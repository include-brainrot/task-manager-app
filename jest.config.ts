import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  passWithNoTests: false,
  roots: ["/**/spec/"],
  collectCoverage: true,
  coverageReporters: ["json", "text", "lcov", "clover"],
  verbose: true,
};

export default config;
