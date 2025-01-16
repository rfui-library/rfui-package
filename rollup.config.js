import typescript from "@rollup/plugin-typescript";
import packageJson from "./package.json" with { type: "json" };

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.main,
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
  external: ["react", "react-dom"],
};
