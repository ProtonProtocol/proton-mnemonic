import { Mnemonic } from '../src';

const phrase = 'lava plunge enough prosper tumble achieve regular glue paddle abstract gaze absurd edit voyage explain'
const index = 0
const publicKeyMock = 'PUB_K1_6Xw8mKbHErkRWw1ysNiaWZo48jqKMrc6geGmbo3cGzvuLRB3Nz'
const privateKeyMock = 'PVT_K1_W465v1XbJY1mF4TbyQ3kzeLX2f63Ziv6NLatUxdd9nAion73H'

describe('Mnemonic', () => {
  it('Phrase works', () => {
    const mnemonic = new Mnemonic({ phrase: phrase })
    const { publicKey, privateKey } = mnemonic.keyPairAtIndex(index)
    expect(publicKey).toEqual(publicKeyMock)
    expect(privateKey).toEqual(privateKeyMock)
  });
});
