import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      //这里猜测应该是一个map，key为别名，value为你要别名的路径
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 跨域
  server: {
    port: '3000',
    proxy: {
      '/api': {
        target: 'https://fanyi.youdao.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
      }
    }
  }
});
