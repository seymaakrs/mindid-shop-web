import sharp from 'sharp';
import { stat } from 'fs/promises';

const inputPath = 'C:/Users/asus/OneDrive/Desktop/mindid-site/public/og-image.jpeg';

// Get metadata first
const meta = await sharp(inputPath).metadata();
console.log(`Original: ${meta.width}x${meta.height}, format: ${meta.format}`);

const originalStat = await stat(inputPath);
console.log(`Original size: ${(originalStat.size / 1024).toFixed(1)} KB`);

// Resize to max 1200x630 and compress as JPEG with quality reduction
await sharp(inputPath)
  .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 75, mozjpeg: true })
  .toFile(inputPath + '.tmp');

// Check temp file size
const tmpStat = await stat(inputPath + '.tmp');
console.log(`Compressed size: ${(tmpStat.size / 1024).toFixed(1)} KB`);

if (tmpStat.size < 200 * 1024) {
  // Overwrite original with compressed version
  const { copyFile, unlink } = await import('fs/promises');
  await copyFile(inputPath + '.tmp', inputPath);
  await unlink(inputPath + '.tmp');
  console.log('SUCCESS: File compressed and overwritten.');
} else {
  // Try lower quality
  await sharp(inputPath)
    .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 60, mozjpeg: true })
    .toFile(inputPath + '.tmp2');

  const tmp2Stat = await stat(inputPath + '.tmp2');
  console.log(`Lower quality size: ${(tmp2Stat.size / 1024).toFixed(1)} KB`);

  const { copyFile, unlink } = await import('fs/promises');
  await copyFile(inputPath + '.tmp2', inputPath);
  await unlink(inputPath + '.tmp');
  await unlink(inputPath + '.tmp2');
  console.log('SUCCESS: File compressed (lower quality) and overwritten.');
}

// Final verification
const finalStat = await stat(inputPath);
console.log(`Final size: ${(finalStat.size / 1024).toFixed(1)} KB`);
