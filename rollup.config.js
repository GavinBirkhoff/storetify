import { terser } from "rollup-plugin-terser"
import filesize from "rollup-plugin-filesize"
import license from "rollup-plugin-license"
import typescript from "rollup-plugin-typescript"
import sourceMaps from "rollup-plugin-sourcemaps"
import pkg from "./package.json"

const licenseBanner = license({
  banner: {
    content: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */",
    commentStyle: "none",
  },
})

export default {
  input: "./src/main.ts",
  plugins: [
    terser(),
    licenseBanner, // must be applied after terser
    filesize(),
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
    }),
    sourceMaps(),
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
      name: "LocalStorePro",
      noConflict: true,
      sourcemap: true,
    },
  ],
}
