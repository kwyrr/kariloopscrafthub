import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        'babys-breath': 'babys-breath.html',
        'big-thai-rose': 'big-thai-rose.html',
        'blooming-tulips': 'blooming-tulips.html',
        'calla-lily': 'calla-lily.html',
        'carnations': 'carnations.html',
        'cosmos': 'cosmos.html',
        'daisy': 'daisy.html',
        'detailed-sunflower': 'detailed-sunflower.html',
        'fluffy-tulips': 'fluffy-tulips.html',
        'forget-me-not': 'forget-me-not.html',
        'inventory': 'inventory.html',
        'lavenders': 'lavenders.html',
        'peonies': 'peonies.html',
        'leaf-stem': 'leaf-stem.html',
        'lily-of-the-valley': 'lily-of-the-valley.html',
        'little-hearts': 'little-hearts.html',
        'mini-rose': 'mini-rose.html',
        'ping-pong-flower': 'ping-pong-flower.html',
        'plumeria': 'plumeria.html',
        'stargazer-lily': 'stargazer-lily.html',
        'dictionary': 'dictionary.html',
        'calendar': 'calendar.html',
        'catalogue': 'catalogue.html',
      },
    },
  },
});