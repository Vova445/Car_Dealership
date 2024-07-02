import { Linter } from "eslint";

/** @type {Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "no-unused-vars": "warn", 
    "@typescript-eslint/explicit-function-return-type": "off"
  },
};

export default config;
