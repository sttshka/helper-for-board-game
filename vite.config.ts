import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/helper-for-board-game/',
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()]
    })
  ]
});
