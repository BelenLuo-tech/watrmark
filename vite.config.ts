import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import banner from 'vite-plugin-banner'
import pkg from "./package.json"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      preact(),
      mode === "development" && createHtmlPlugin({
        minify: true,
        template: './index.html',
        inject: {
          data: {
            title: "watermark",
            injectScript: `<script type="module" src="./lib/index.ts"></script>`
          }
        },
      }),
      banner(`/**
* ${pkg.name}
* version: v${pkg.version}
*/`)
    ],
    build: {
      target: "es2015",
      lib: {
        entry: './lib/index.ts',
        name: 'watermark',
        fileName: (format) => `watermark.${format}.js`
      },
      outDir: "dist"
    },
  }
})
