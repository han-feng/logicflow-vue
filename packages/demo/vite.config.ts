import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import visualizer from "rollup-plugin-visualizer"
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(`🚀 command: ${command}, mode: ${mode}\n`)
  return {
    base: './',
    plugins: [
      vue(),
      splitVendorChunkPlugin(),
      Components({
        // Vue 组件自动按需导入
        resolvers: [
          AntDesignVueResolver({
            resolveIcons: true
          })
        ],
        dts: command === 'build' ? "src/components.d.ts" : false
      }),
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: './node_modules/.cache/visualizer/stats.html'
      })
    ],
    resolve: {
      alias: {
        "@/": "/src/",
        "@logicflow/core/dist/style/index.css": "@logicflow/core/dist/style/index.css",
        "@logicflow/core": "@logicflow/core/dist/logic-flow.js",
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: join(__dirname, 'index.html'),
          viewer: join(__dirname, 'viewer.html'),
          modeler: join(__dirname, 'modeler.html')
        }
      }
    },
    server: {
      open: true,
      port: 4173,
      strictPort: true
    }
  }
})
