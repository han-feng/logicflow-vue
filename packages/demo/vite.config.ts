import vue from '@vitejs/plugin-vue';
import visualizer from "rollup-plugin-visualizer";
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
  server: {
    open: true
  }
});
