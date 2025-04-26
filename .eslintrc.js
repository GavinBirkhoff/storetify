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
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prettier/prettier": 2,
    "@typescript-eslint/no-inferrable-types": 0,
    "import/extensions": 0,
    "no-unresolved": 0,
  },
  overrides: [
    {
      files: [".eslintrc.js", "*.js"],
      parser: "espree",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: null,
      },
    },
  ],
}
