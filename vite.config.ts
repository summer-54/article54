import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
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