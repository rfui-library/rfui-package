import typescript from "@rollup/plugin-typescript";
import packageJson from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [typescript()],
  external: ["react", "react-dom"],
};
