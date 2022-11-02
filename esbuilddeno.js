// test/index.js
import { build, stop } from "https://deno.land/x/esbuild/mod.js";
import { httpImports } from "./esbuild_plugin_http_imports_index.ts";

let { outputFiles } = await build({
  bundle: true,
  entryPoints: ["docs/demo.js"],
  plugins: [httpImports()],
  write: false,
  format:'esm',
  target: 'chrome100',
  treeShaking: true,
  minify: true,
  external:['react','react-dom']
});


// console.log(outputFiles[0].text);

await Deno.writeTextFile("./demo.esbuildeno.js",outputFiles[0].text);


stop();