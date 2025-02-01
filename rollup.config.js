import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import packageJson from "./package.json" with { type: "json" };

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.main,
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    copy({
      targets: [
        { src: "src/rfui-tailwind.css", dest: "dist" },
        { src: "src/rfui.css", dest: "dist" },
      ],
    }),
  ],
  external: ["react", "react-dom"],
};
