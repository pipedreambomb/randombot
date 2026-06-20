class MockAudioContext {
  constructor() {
    this.sampleRate = 44100;
  }
  createBuffer(channels, size, sampleRate) {
    return {
      getChannelData: () => new Float32Array(size),
      sampleRate: sampleRate
    };
  }
}

const ctx = new MockAudioContext();

function original() {
  const bufferSize = ctx.sampleRate * 0.05;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

let cachedBuffer = null;
function optimized() {
  if (cachedBuffer) return cachedBuffer;
  const bufferSize = ctx.sampleRate * 0.05;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  cachedBuffer = buffer;
  return buffer;
}

// Warmup
for (let i = 0; i < 100; i++) {
  original();
  optimized();
}

const start1 = performance.now();
for (let i = 0; i < 100000; i++) {
  original();
}
const end1 = performance.now();

const start2 = performance.now();
for (let i = 0; i < 100000; i++) {
  optimized();
}
const end2 = performance.now();

console.log(`Original: ${end1 - start1}ms`);
console.log(`Optimized: ${end2 - start2}ms`);
console.log(`Improvement: ${((end1 - start1) / (end2 - start2)).toFixed(2)}x faster`);
