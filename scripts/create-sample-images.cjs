const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Simple PNG generator function (supported by modern browsers)
function createPNG(width, height, r1, g1, b1, r2, g2, b2) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit
  ihdr.writeUInt8(2, 9); // RGB
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);
    let c = 0xffffffff;
    const crcBuf = Buffer.concat([Buffer.from(type), data]);
    for (let i = 0; i < crcBuf.length; i++) {
      c ^= crcBuf[i];
      for (let j = 0; j < 8; j++) {
        c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
      }
    }
    buf.writeUInt32BE((c ^ 0xffffffff) >>> 0, 8 + len);
    return buf;
  }

  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter None
    const t = y / height;
    const cr = Math.round(r1 * (1 - t) + r2 * t);
    const cg = Math.round(g1 * (1 - t) + g2 * t);
    const cb = Math.round(b1 * (1 - t) + b2 * t);

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      // create subtle texture pattern
      const noise = ((x * 13 + y * 17) % 19) - 9;
      rawData[pxOffset] = Math.min(255, Math.max(0, cr + noise));
      rawData[pxOffset + 1] = Math.min(255, Math.max(0, cg + noise));
      rawData[pxOffset + 2] = Math.min(255, Math.max(0, cb + noise));
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const imagesDir = path.resolve(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate sample historical steppe background textures (16:9 ratio, 960x540)
// Hero: Steppe horizon & green hills (warm olive/emerald)
fs.writeFileSync(path.join(imagesDir, 'hero.jpg'), createPNG(960, 540, 45, 90, 65, 180, 160, 130));

// Besshatyr: Earthy korgan mound colors (rich sienna to golden earth)
fs.writeFileSync(path.join(imagesDir, 'besshatyr.jpg'), createPNG(960, 540, 160, 110, 60, 205, 180, 140));

// Bostan: Field archaeological excavation tones (terracotta & stone)
fs.writeFileSync(path.join(imagesDir, 'bostan.jpg'), createPNG(960, 540, 140, 120, 90, 190, 175, 150));

// Shokan: Museum & memorial architecture blue/stone tones
fs.writeFileSync(path.join(imagesDir, 'shokan.jpg'), createPNG(960, 540, 30, 70, 100, 170, 180, 190));

// Mura: Official heritage monument preservation green
fs.writeFileSync(path.join(imagesDir, 'mura.jpg'), createPNG(960, 540, 27, 67, 50, 100, 140, 110));

// Timeline: Golden hour historic sky & chronicle panorama
fs.writeFileSync(path.join(imagesDir, 'timeline.jpg'), createPNG(960, 540, 180, 110, 30, 220, 190, 130));

console.log('Sample local images created in public/images/');
