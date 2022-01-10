import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      path: '/ws/',
      clientPort: 8080
    }
  },
  resolve: {
    alias: [
      { find: 'images', replacement: path.resolve(__dirname, 'src/images') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'views', replacement: path.resolve(__dirname, 'src/views') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: 'locales', replacement: path.resolve(__dirname, 'src/locales') },
      { find: 'constants', replacement: path.resolve(__dirname, 'src/constants') },
    ],
  }
})
