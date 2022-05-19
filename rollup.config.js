import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

import { dependencies, main, module } from "./package.json";

export default {
  input: "src/index.ts",
  external: Object.keys(dependencies),
  output: [
    {
      format: "cjs",
      file: main,
      exports: "auto",
    },
    {
      format: "esm",
      file: module,
    },
  ],
  plugins: [typescript({ sourceMap: false }), terser()],
};
