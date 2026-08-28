import { join } from 'path'
import vue from '@vitejs/plugin-vue'
import visualizer from 'rollup-plugin-visualizer'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'
import image from './script/img2b64.js'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(`🚀 command: ${command}, mode: ${mode}\n`)
  return {
    base: './',
    plugins: [
      vue(),
      image() as any,
      components({
        // Vue 组件自动按需导入
        resolvers: [
          AntDesignVueResolver({
            resolveIcons: true,
            importStyle: false,
          }),
        ],
        dts: command === 'build' ? 'src/components.d.ts' : false,
      }),
      resolveExternalsPlugin({
        serverConfig: 'serverConfig',
      }),
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: './node_modules/.cache/visualizer/stats.html',
      }),
    ],
    resolve: {
      alias: {
        '@/': '/src/',
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: join(__dirname, 'index.html'),
          viewer: join(__dirname, 'viewer.html'),
          modeler: join(__dirname, 'modeler.html'),
        },
      },
    },
    server: {
      host: '127.0.0.1',
      port: 4173,
      strictPort: true,
    },
  }
})
