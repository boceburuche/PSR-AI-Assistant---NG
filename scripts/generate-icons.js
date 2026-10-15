import fs from 'fs';
import zlib from 'zlib';

function createPng(width, height, r, g, b) {
  // Minimal uncompressed PNG generator
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(2, 9); // Truecolor (RGB)
  ihdrData.writeUInt8(0, 10); // Compression
  ihdrData.writeUInt8(0, 11); // Filter
  ihdrData.writeUInt8(0, 12); // Interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image data with filter byte 0 at start of each line
  const rawData = Buffer.alloc(height * (width * 3 + 1));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (width * 3 + 1);
    rawData[rowOffset] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 3;
      // create a nice green gradient with gold border border
      const isBorder = (x < 12 || x > width - 13 || y < 12 || y > height - 13);
      if (isBorder) {
        rawData[pixelOffset] = 245;     // Gold R
        rawData[pixelOffset + 1] = 158; // Gold G
        rawData[pixelOffset + 2] = 11;  // Gold B
      } else {
        rawData[pixelOffset] = r;
        rawData[pixelOffset + 1] = g;
        rawData[pixelOffset + 2] = b;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

const table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  table[i] = c >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crcBuf]);
}

if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

// Nigerian Federal Green: #008751 -> (0, 135, 81)
fs.writeFileSync('public/pwa-192x192.png', createPng(192, 192, 0, 135, 81));
fs.writeFileSync('public/pwa-512x512.png', createPng(512, 512, 0, 135, 81));
fs.writeFileSync('public/pwa-maskable-512x512.png', createPng(512, 512, 0, 100, 50));
fs.writeFileSync('public/apple-touch-icon.png', createPng(180, 180, 0, 135, 81));
fs.writeFileSync('public/favicon.ico', createPng(32, 32, 0, 135, 81));
console.log('Icons generated successfully.');
