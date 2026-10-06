/** @type {import('jest').Config} */
export default {
  testEnvironment: "jsdom",
  testRegex: "\\.(spec|test)\\.[mc]?tsx?$",
  transform: {
    "^.+\\.tsx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: { runtime: "automatic" }
          }
        }
      }
    ]
  },
  setupFiles: ["<rootDir>/jest.setup.ts"]
};
