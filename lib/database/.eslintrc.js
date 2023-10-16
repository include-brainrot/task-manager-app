module.exports = {
  root: false,
  env: {
    node: true,
    es2022: true,
  },
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "no-console": "error",
    "sort-imports": [
      "error",
      {
        allowSeparatedGroups: true,
      },
    ],
  },
};
