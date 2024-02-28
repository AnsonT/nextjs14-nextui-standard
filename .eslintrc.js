const config = require('eslint-config-standard-typescript-prettier');

module.exports = {
  ...config,
  parserOptions: { project: "./tsconfig.json" },
  rules: {
    ...config.rules,
    "@typescript-eslint/no-explicit-any": "error",
  },
  extends: ["next/core-web-vitals", ...config.extends]
};
