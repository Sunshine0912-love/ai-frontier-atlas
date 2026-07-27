import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sunshine0912-love.github.io',
  base: '/ai-frontier-atlas',
  trailingSlash: 'always',
  build: { format: 'directory' }
});
