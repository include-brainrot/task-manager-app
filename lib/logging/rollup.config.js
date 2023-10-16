import dts from "rollup-plugin-dts";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const pkg = require("./package.json");

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        include: [
          "./src/**/*.ts",
          "./typings/**/*.d.ts",
          "../../typings/**/*.d.ts",
        ],
        outputToFilesystem: false,
      }),
      terser({
        mangle: { toplevel: true },
        compress: {
          module: true,
          toplevel: true,
          unsafe_arrows: true,
        },
      }),
    ],
    external: ["date-fns", "path", "@lib/config", "@lib/utility"],
  },
  {
    input: "./dist/esm/index.d.ts",
    output: [{ file: "./dist/index.d.ts", format: "esm" }],
    plugins: [nodeResolve(), dts.default()],
  },
];
