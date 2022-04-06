export function getRandomValues(buf: Uint8Array) {
  if (window && window.crypto && window.crypto.getRandomValues) {
    return window.crypto.getRandomValues(buf);
  }
  if (window && typeof (window as any).msCrypto === 'object' && typeof (window as any).msCrypto.getRandomValues === 'function') {
    return (window as any).msCrypto.getRandomValues(buf);
  }

  const crypto = require('crypto')
  if (crypto.randomBytes) {
    if (!(buf instanceof Uint8Array)) {
      throw new TypeError('expected Uint8Array');
    }
    if (buf.length > 65536) {
        throw new TypeError('Buffer too large');
    }
    var bytes = crypto.randomBytes(buf.length);
    buf.set(bytes);
    return buf;
  }
  else {
    throw new Error('No secure random number generator available.');
  }
}

module.exports = getRandomValues;