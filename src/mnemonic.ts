import { sha256 } from 'hash.js';
import { BIP32Interface, fromSeed } from 'bip32';
import { mnemonicToSeedSync } from 'bip39';
import { wordlist } from './wordlist';

const zfill = (source: string, length: number) => {
  source = source.toString();
  while (source.length < length) {
    source = '0' + source;
  }
  return source;
};

const hexStringToBinaryString = (hexString: string) => {
  let binaryString = '';
  for (let i = 0; i < hexString.length; i++) {
    binaryString += zfill(parseInt(hexString[i], 16).toString(2), 4);
  }
  return binaryString;
};

const byteArrayToBinaryString = (data: Uint8Array) => {
  let bin = '';
  for (let i = 0; i < data.length; i++) {
    bin += zfill(data[i].toString(2), 8);
  }
  return bin;
};

const byteArrayToWordArray = (data: Uint8Array) => {
  const a = [];
  for (let i = 0; i < data.length / 4; i++) {
    let v = 0;
    v += data[i * 4 + 0] << (8 * 3);
    v += data[i * 4 + 1] << (8 * 2);
    v += data[i * 4 + 2] << (8 * 1);
    v += data[i * 4 + 3] << (8 * 0);
    a.push(v);
  }
  return a;
};

const joinWords = (words: string[]) => {
  const space = ' ';
  return words.join(space);
};

const toMnemonic = (byteArray: Uint8Array) => {
  if (byteArray.length % 4 > 0) {
    throw 'Data length in bits should be divisible by 32, but it is not ' +
      `(${byteArray.length} bytes = ${byteArray.length * 8} bits).`;
  }

  const data = byteArrayToWordArray(byteArray);
  const h = sha256()
    .update(data)
    .digest('hex');

  const a = byteArrayToBinaryString(byteArray);
  const c = zfill(hexStringToBinaryString(h), 256);
  const d = c.substring(0, (byteArray.length * 8) / 32);
  const b = a + d;

  const result = [];
  const blen = b.length / 11;
  for (let i = 0; i < blen; i++) {
    const idx = parseInt(b.substring(i * 11, (i + 1) * 11), 2);
    result.push(wordlist[idx]);
  }

  return joinWords(result);
};

export const generateMnemonic = (strength: number) => {
  strength = strength || 128;
  const r = strength % 32;
  if (r > 0) {
    throw 'Strength should be divisible by 32, but it is not (' + r + ').';
  }
  const hasStrongCrypto = 'crypto' in window && window['crypto'] !== null;
  if (!hasStrongCrypto) {
    throw 'Mnemonic should be generated with strong randomness, but crypto.getRandomValues is unavailable';
  }
  const buffer = new Uint8Array(strength / 8);
  const data = crypto.getRandomValues(buffer);
  return toMnemonic(data);
};

export const calcBip32ExtendedKey = ({
    mnemonic,
    passphrase,
    derivationPath
}: {
    mnemonic: string,
  passphrase?: string,
  derivationPath: string
}) => {
  const seed = mnemonicToSeedSync(mnemonic, passphrase);
  let extendedKey: BIP32Interface = fromSeed(seed, undefined);

  // Derive the key from the path
  const pathBits = derivationPath.split('/');
  for (let i = 0; i < pathBits.length; i++) {
    const bit = pathBits[i];

    const index = parseInt(bit);
    if (isNaN(index)) {
      continue;
    }

    const hardened = bit[bit.length - 1] == "'";
    const isPriv = !extendedKey.isNeutered();
    const invalidDerivationPath = hardened && !isPriv;

    if (invalidDerivationPath) {
      extendedKey = null as any;
    } else if (hardened) {
      extendedKey = extendedKey.deriveHardened(index);
    } else {
      extendedKey = extendedKey.derive(index);
    }
  }

  return extendedKey;
};
