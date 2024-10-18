import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	coverageProvider: "babel",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^@/components/(.*)$": "<rootDir>/components/$1",
		"^@/lib/(.*)$": "<rootDir>/lib/$1",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	collectCoverage: true,
	coverageReporters: ["json", "lcov", "text", "clover", "html"],
	collectCoverageFrom: [
		"app/**/*.ts",
		"app/**/*.tsx",
		"components/**/*.tsx",
		"lib/**/*.ts",
	],
};

export default createJestConfig(config);
