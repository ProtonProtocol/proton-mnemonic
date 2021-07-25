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

const mnemonic = new Mnemonic()

// e.g. 'lava plunge enough prosper tumble achieve regular glue paddle abstract gaze absurd edit voyage explain'
console.log(mnemonic.phrase)

const { publicKey, privateKey } = mnemonic.keyPairAtIndex(0)

// e.g. 'PUB_K1_6Xw8mKbHErkRWw1ysNiaWZo48jqKMrc6geGmbo3cGzvuLRB3Nz' 'PVT_K1_W465v1XbJY1mF4TbyQ3kzeLX2f63Ziv6NLatUxdd9nAion73H'
console.log(publicKey, privateKey)
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