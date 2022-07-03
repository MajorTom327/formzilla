import typescript from "@rollup/plugin-typescript";

export default [
  // CommonJS
  {
    input: "src/index.ts",
    output: {
      dir: "./dist",
      entryFileNames: "index.js",
      format: "cjs",
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: "dist",
        rootDir: "src/",
      }),
    ],
  },

  // // ES
  // {
  //   input: "src/index.ts",
  //   output: { file: "dist/es/index.js", format: "es" },
  //   plugins: [typescript()],
  // },
];
