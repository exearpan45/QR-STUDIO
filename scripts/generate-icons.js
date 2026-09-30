// Pure Node script to generate valid PNG icons without external native dependencies
import fs from 'fs';
import zlib from 'zlib';

function createPng(width, height, drawFn) {
  // RGBA buffer: (width * 4 + 1) * height (1 byte filter per line)
  const lineStride = width * 4 + 1;
  const rawData = Buffer.alloc(lineStride * height);

  for (let y = 0; y < height; y++) {
    const lineStart = y * lineStride;
    rawData[lineStart] = 0; // Filter type 0: None
    for (let x = 0; x < width; x++) {
      const pixelStart = lineStart + 1 + x * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawData[pixelStart] = r;
      rawData[pixelStart + 1] = g;
      rawData[pixelStart + 2] = b;
      rawData[pixelStart + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // CRC32 helper
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii');
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);

    const crcBuf = Buffer.alloc(4);
    const combined = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(combined), 0);

    return Buffer.concat([lenBuf, combined, crcBuf]);
  }

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type 6: RGBA
  ihdr[10] = 0; // compression method
  ihdr[11] = 0; // filter method
  ihdr[12] = 0; // interlace method

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function qrDrawer(x, y, w, h) {
  const nx = x / w;
  const ny = y / h;

  // Background deep slate #0F172A
  let r = 15;
  let g = 23;
  let b = 42;
  let a = 255;

  // Diagonal gradient glow
  const grad = (nx + ny) * 0.5;
  r = Math.floor(15 + grad * 35);
  g = Math.floor(23 + grad * 20);
  b = Math.floor(42 + grad * 70);

  // Check finder patterns:
  // Top-left: [0.15, 0.15] to [0.42, 0.42]
  // Top-right: [0.58, 0.15] to [0.85, 0.42]
  // Bottom-left: [0.15, 0.58] to [0.42, 0.85]
  function inBox(cx, cy, sz) {
    return Math.abs(nx - cx) <= sz && Math.abs(ny - cy) <= sz;
  }

  function inFinder(cx, cy) {
    if (inBox(cx, cy, 0.13)) {
      // Outer border or inner center?
      if (!inBox(cx, cy, 0.09) || inBox(cx, cy, 0.05)) {
        return true;
      }
    }
    return false;
  }

  const isFinder = inFinder(0.28, 0.28) || inFinder(0.72, 0.28) || inFinder(0.28, 0.72);

  if (isFinder) {
    // Indigo-violet highlight
    r = Math.floor(99 + nx * 40);
    g = Math.floor(102 + ny * 20);
    b = 241;
  } else {
    // Center dots / accents
    if (inBox(0.5, 0.5, 0.04) || inBox(0.65, 0.65, 0.05) || inBox(0.5, 0.72, 0.035) || inBox(0.72, 0.5, 0.035)) {
      r = 6;
      g = 182;
      b = 212; // Cyan accent
    }
  }

  return [r, g, b, a];
}

const icons = [
  { file: 'public/pwa-192x192.png', size: 192 },
  { file: 'public/pwa-512x512.png', size: 512 },
  { file: 'public/pwa-maskable-512x512.png', size: 512 },
  { file: 'public/apple-touch-icon.png', size: 180 },
];

for (const icon of icons) {
  const buf = createPng(icon.size, icon.size, qrDrawer);
  fs.writeFileSync(icon.file, buf);
  console.log(`Generated ${icon.file} (${icon.size}x${icon.size})`);
}
