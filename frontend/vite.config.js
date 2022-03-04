import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import globals from "rollup-plugin-node-globals";
import { nodeResolve } from "@rollup/plugin-node-resolve";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  optimizeDeps: {
    exclude: ["electron-fetch"],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // output: {
      //   intro: 'const global = window'
      // },
      plugins: [],
    },
  },
});
