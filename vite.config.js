import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

const rootDir = process.cwd();
const htmlFiles = fs.readdirSync(rootDir).filter(file => file.endsWith('.html'));
const input = {};
htmlFiles.forEach(file => {
  const name = file.replace('.html', '');
  input[name] = resolve(rootDir, file);
});

export default defineConfig({
  build: {
    rollupOptions: {
      input
    }
  }
})
