import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      entryRoot: resolve(__dirname, 'src'),
      // outputDir: ['dist'],
      insertTypesEntry: true,
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: './node_modules/.cache/visualizer/stats.html',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'logicflow-useapi',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'lodash-es', 'vue', '@logicflow/core',
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'lodash-es': '_',
          'vue': 'Vue',
          '@logicflow/core': 'LogicFlow',
        },
      },
    },
  },
})
