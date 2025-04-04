import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import mdx from '@mdx-js/rollup';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import recmaImportsResolver from "recma-imports-resolver";
import recmaRestrictIdentifiers from "recma-restrict-identifiers";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // This helps avoid the export helper
          hoistStatic: false
        }
      }
    }),
    vueDevTools(),
    mdx({
      jsxRuntime: 'automatic',
      jsxImportSource: 'vue',
      rehypePlugins: [rehypeKatex],
      remarkPlugins: [remarkMath],
      recmaPlugins: [
        recmaImportsResolver(source => {
          console.log(source);
          if (source.endsWith(".mdx")) return source;
          if (source.startsWith("$") && !source.substring(2).includes("..")) return `article54/${source.substring(2)}`;
        }, "article54/403.vue"),
        recmaRestrictIdentifiers()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      article54: fileURLToPath(new URL('./src/article54', import.meta.url))
    },
  },
  build: {
    outDir: 'dist-js',
    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
      fileName: 'my-components'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        // Preserve .vue extensions
        preserveModules: true,
        entryFileNames: ({ name }) => {
          return `${name}.js`
        },
        // assetFileNames: ({ name, names }) => {
        //   console.log(name, names);
        //   if (name.endsWith('.vue')) {
        //     return `${name}`
        //   }
        //   return `assets/[name].[ext]`
        // }
      }
    }
  }
});