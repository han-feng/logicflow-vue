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
        "@": "/src"
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
      host: '0.0.0.0',
      // https: true,
      port: 8088,
      proxy: {
        '/api': {
          target: 'http://localhost:8080/zlease/flow/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/ws-api': {
          target: 'wss://nest-api.buqiyuan.site',
          // target: 'http://localhost:7002',
          changeOrigin: true, //是否允许跨域
          ws: true,
        },
      },
    }
  }
})
