import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Auto-sync hero video files from Downloads
function syncVideoAssets() {
  const downloadsDir = 'C:\\Users\\LENOVO\\Downloads';
  const videoSrcDir = 'C:\\Users\\LENOVO\\Downloads\\SS-Infotech-V2-master\\SS-Infotech-V2-master\\frontend\\public\\video';
  const videoDestDir = path.resolve(__dirname, './public/videos');

  try {
    if (!fs.existsSync(videoDestDir)) {
      fs.mkdirSync(videoDestDir, { recursive: true });
    }

    // Check direct download of hero.mp4 & service.mp4
    const directHero = path.join(downloadsDir, 'hero.mp4');
    if (fs.existsSync(directHero)) {
      fs.copyFileSync(directHero, path.join(videoDestDir, 'hero.mp4'));
      fs.copyFileSync(directHero, path.join(videoDestDir, 'tech-hero.mp4'));
      console.log('[Vite] Synced user video hero.mp4 from Downloads!');
    }

    const directService = path.join(downloadsDir, 'service.mp4');
    const directServices = path.join(downloadsDir, 'services.mp4');
    const ssServices = path.join(downloadsDir, 'SS-Infotech-V2-master\\SS-Infotech-V2-master\\frontend\\public\\services.mp4');
    
    if (fs.existsSync(directServices)) {
      fs.copyFileSync(directServices, path.join(videoDestDir, 'services.mp4'));
      fs.copyFileSync(directServices, path.join(videoDestDir, 'service.mp4'));
      console.log('[Vite] Synced services.mp4 from Downloads!');
    } else if (fs.existsSync(directService)) {
      fs.copyFileSync(directService, path.join(videoDestDir, 'services.mp4'));
      fs.copyFileSync(directService, path.join(videoDestDir, 'service.mp4'));
      console.log('[Vite] Synced service.mp4 from Downloads!');
    } else if (fs.existsSync(ssServices)) {
      fs.copyFileSync(ssServices, path.join(videoDestDir, 'services.mp4'));
      fs.copyFileSync(ssServices, path.join(videoDestDir, 'service.mp4'));
      console.log('[Vite] Synced SS services.mp4 from package!');
    }

    const videosToCopy = ['hero1.mp4', 'hero2.mp4', 'hero3.mp4', 'hero4.mp4'];
    videosToCopy.forEach((filename) => {
      const srcFile = path.join(videoSrcDir, filename);
      const destFile = path.join(videoDestDir, filename);
      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`[Vite] Copied ${filename} to ${destFile}`);
      }
    });
  } catch (err) {
    console.warn('[Vite] Video sync warning:', err.message);
  }
}

syncVideoAssets();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
