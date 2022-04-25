import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import visualizer from "rollup-plugin-visualizer"
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
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
      dts: "src/components.d.ts"
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: './node_modules/.cache/visualizer/stats.html'
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        viewer: resolve(__dirname, 'viewer.html'),
        modeler: resolve(__dirname, 'modeler.html')
      }
    }
  },
  server: {
    open: true
  }
})
