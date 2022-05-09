import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  external: [/node_modules/],
  output: [
    {
      format: "cjs",
      file: pkg.main,
      exports: "auto",
    },
    {
      format: "esm",
      file: pkg.module,
    },
  ],
  plugins: [typescript({ sourceMap: false })],
};
