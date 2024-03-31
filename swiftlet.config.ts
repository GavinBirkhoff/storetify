const path = require("path")
const { defineConfig } = require("swiftlet")

const input = path.resolve("./src/", "index.ts")

module.exports = defineConfig({
  input,
  target: ["esm", "cjs", "umd"],
  outDir: "./dist",
})
