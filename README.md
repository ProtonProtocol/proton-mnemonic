<h1 align="center">Welcome to EOSIO Mnemonic 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/TheSyedJafri" target="_blank">
    <img alt="Twitter: TheSyedJafri" src="https://img.shields.io/twitter/follow/TheSyedJafri.svg?style=social" />
  </a>
</p>

> Generate EOSIO Mnemonics and associated public/private keys

## Install

```sh
npm install eosio-mnemonic
```

## Usage

```ts
import { Mnemonic } from 'eosio-mnemonic'

/**
 * mnemonic.phrase: e.g. 'reflect note upgrade mention marine sword track pride robust vessel tube sausage kind trick neglect'
 */
const mnemonic = new Mnemonic()

/**
 * Keys
 *  - publicKey: e.g. PUB_K1_71ESPbpkYsR9iQd1tgqxqZqUJFX8veJGUS5RnGGekq4Vb1ExPj
 *  - privateKey: e.g. PVT_K1_du8FBHSYpapVw17ZmWBU3u3dBCARMFe54X49yfPrFCUoXpADk
 */
const { publicKey, privateKey } = mnemonic.keyPairAtIndex(0)

/**
 * Legacy Keys
 *  - publicKeyLegacy: e.g. EOS71ESPbpkYsR9iQd1tgqxqZqUJFX8veJGUS5RnGGekq4Vd64yg6
 *  - privateKeyLegacy: e.g. 5JTBhvdNX1Pa5WKH9mDQGWo2GE17NZDLMt8JHL2Qdj6qeTjzqE6
 */
const { publicKey: publicKeyLegacy, privateKey: privateKeyLegacy } = mnemonic.keyPairAtIndex(0, true)
```

## Options
```ts
const mnemonic = new Mnemonic({
  phrase, // Existing phrase, leave undefined to create new one
  passphrase, // Existing mnemonic password, leave undefined to not specify
  numWords // How long you want the mnemonic phrase to be
})

const newFormat = mnemonic.keyPairAtIndex(0) // PUB_K1_ and PVT_K1_
const oldFormat = mnemonic.keyPairAtIndex(0, true) // EOSXXX and 5XXXX
```

## Run tests

```sh
npm run test
```

## Author

👤 **Syed Jafri**

* Website: bloks.io
* Twitter: [@TheSyedJafri](https://twitter.com/TheSyedJafri)
* Github: [@jafri](https://github.com/jafri)

## Show your support

Give a ⭐️ if this project helped you!