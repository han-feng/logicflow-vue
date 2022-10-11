import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { type PluginOption, defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import image from './script/img2b64'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      entryRoot: resolve(__dirname, 'src'),
      // outputDir: ['dist'],
      insertTypesEntry: true,
      exclude: ['src/icons.ts'],
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: './node_modules/.cache/visualizer/stats.html',
    }) as PluginOption,
    image() as PluginOption,
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'logicflow-bpmn',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        '@logicflow/core',
        '@logicflow/extension',
        'logicflow-useapi',
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'vue': 'Vue',
          '@logicflow/core': 'LogicFlow',
          '@logicflow/extension': 'LogicFlowEx',
          'logicflow-useapi': 'LogicFlowUse',
        },
      },
    },
  },
})
