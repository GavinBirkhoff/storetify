module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended", "prettier", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-inferrable-types": "2",
    "import/extensions": "2",
    "no-unresolved": "2",
  },
}
