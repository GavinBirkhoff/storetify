import terser from "@rollup/plugin-terser"
import filesize from "rollup-plugin-filesize"
import license from "rollup-plugin-license"
import typescript from "@rollup/plugin-typescript"
import sourceMaps from "rollup-plugin-sourcemaps"
import dts from "rollup-plugin-dts"
import path from "path"
import pkg from "./package.json"

const resolve = (...args) => path.resolve(...args)
const input = resolve("./src", "index.ts")

const licenseBanner = license({
  banner: {
    content: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */",
    commentStyle: "none",
  },
})

export default [
  {
    input,
    plugins: [
      terser(),
      licenseBanner, // must be applied after terser
      filesize(),
      typescript(),
      sourceMaps(),
      // dts(),
    ],
    output: [
      {
        format: "cjs",
        file: `lib/${pkg.name}.cjs.js`,
        sourcemap: true,
      },
      {
        format: "es",
        file: `lib/${pkg.name}.esm.js`,
        sourcemap: true,
      },
      {
        format: "umd",
        file: `lib/${pkg.name}.min.js`,
        name: "Storetify",
        noConflict: true,
        sourcemap: true,
      },
    ],
  },
  {
    input,
    plugins: [licenseBanner, dts()],
    output: [
      {
        format: "es",
        file: `lib/${pkg.name}.d.ts`,
      },
    ],
  },
]
