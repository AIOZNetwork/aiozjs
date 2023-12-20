<h1><p align="center"><img alt="AIOZJS" src="docs/logo-vertical-light.png" width="180" /></p></h1>

<div align="center">
  <a href="https://lgtm.com/projects/g/AIOZNetwork/aiozjs/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/AIOZNetwork/aiozjs.svg?logo=lgtm&logoWidth=18"/></a>
  <a href="https://github.com/AIOZNetwork/aiozjs/blob/main/LICENSE">
    <img alt="License: Apache-2.0" src="https://img.shields.io/github/license/AIOZNetwork/aiozjs.svg" />
  </a>
</div>

AIOZJS is the Swiss Army knife to power JavaScript based client solutions
ranging from Web apps/explorers over browser extensions to server-side clients
like faucets/scrapers in the Cosmos ecosystem.

## Documentation

[Here is a list of examples][guided tour] using the Stargate package for use
with [Cosmos SDK 0.41] applications (like [gaia 4]). Take a look at the wiki
page,
["What can AIOZJS do for me?"](https://github.com/AIOZNetwork/aiozjs/wiki/What-can-AIOZJS-do-for-me%3F)
and various tests
([ex](https://github.com/AIOZNetwork/aiozjs/blob/main/packages/stargate/src/signingstargateclient.spec.ts))
for more example usage of the packages.

[guided tour]:
  https://gist.github.com/webmaster128/8444d42a7eceeda2544c8a59fbd7e1d9
[cosmos sdk 0.41]: https://github.com/cosmos/cosmos-sdk/tree/v0.41.0
[gaia 4]: https://github.com/cosmos/gaia/tree/v4.0.0

### API documentation

The full API documentation is hosted at [aioznetwork.github.io/aiozjs]. This is a bit
tricky to navigate and requires basic TypeScript understanding. It is helpful if
you want to look up details for advanced use cases. This documentation is
auto-generated based on the current main branch and can occasionally diverge
from the latest release.

[aioznetwork.github.io/aiozjs]: https://aioznetwork.github.io/aiozjs

### Using custom Stargate modules

Documentation on how to use your own custom modules with AIOZJS for Stargate
chains (Cosmos SDK v0.41) can be found
[here](https://github.com/AIOZNetwork/aiozjs/blob/main/packages/stargate/CUSTOM_PROTOBUF_CODECS.md).

## Packages

AIOZJS is a library that consists of many smaller npm packages within the
[@aiozjs namespace](https://www.npmjs.com/org/aiozjs), a so-called monorepo.
Here are some of them to get an idea:

| Package                                                 | Description                                                                                                                                                                                                                              | Latest                                                                                                                                |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [@aiozjs/stargate](packages/stargate)                   | A client library for the Cosmos SDK 0.40+ (Stargate)                                                                                                                                                                                     | [![npm version](https://img.shields.io/npm/v/@aiozjs/stargate.svg)](https://www.npmjs.com/package/@aiozjs/stargate)                   |
| [@aiozjs/faucet](packages/faucet)                       | A faucet application for node.js                                                                                                                                                                                                         | [![npm version](https://img.shields.io/npm/v/@aiozjs/faucet.svg)](https://www.npmjs.com/package/@aiozjs/faucet)                       |
| [@aiozjs/cosmwasm-stargate](packages/cosmwasm-stargate) | Client for Stargate chains with the CosmWasm module enabled                                                                                                                                                                              | [![npm version](https://img.shields.io/npm/v/@aiozjs/cosmwasm-stargate.svg)](https://www.npmjs.com/package/@aiozjs/cosmwasm-stargate) |
| [@aiozjs/crypto](packages/crypto)                       | Cryptography for blockchain projects, e.g. hashing (SHA-2, Keccak256, Ripemd160), signing (secp256k1, ed25519), HD key derivation (BIP-39, SLIP-0010), KDFs and symmetric encryption for key storage (PBKDF2, Argon2, XChaCha20Poly1305) | [![npm version](https://img.shields.io/npm/v/@aiozjs/crypto.svg)](https://www.npmjs.com/package/@aiozjs/crypto)                       |
| [@aiozjs/encoding](packages/encoding)                   | Encoding helpers for blockchain projects                                                                                                                                                                                                 | [![npm version](https://img.shields.io/npm/v/@aiozjs/encoding.svg)](https://www.npmjs.com/package/@aiozjs/encoding)                   |
| [@aiozjs/math](packages/math)                           | Safe integers; decimals for handling financial amounts                                                                                                                                                                                   | [![npm version](https://img.shields.io/npm/v/@aiozjs/math.svg)](https://www.npmjs.com/package/@aiozjs/math)                           |

### Modularity

We're pretty proud of the modularity and a clean dependency tree in this
monorepo. This ensures software quality on our side and lets users pick exactly
what they need. Here you see how everything fits together (every item is a npm
package; right depends on left):

![AIOZJS dependency tree](docs/aiozjs-tree.png)

If this was not enough to scare you away, check out the version including app
runtime dependencies: [aiozjs-tree-full.png](docs/aiozjs-tree-full.png).

<!--
Build with depsight (https://github.com/webmaster128/depsight), using:

from_npm . | depsight --include "^@aiozjs" --format png --dpi 150 --output docs/aiozjs-tree.png
from_npm . | depsight --exclude aiozjs-monorepo-root --format png --dpi 150 --output docs/aiozjs-tree-full.png
optipng docs/aiozjs-tree*.png
-->

### Supported JS environments

Currently the codebase supports the following runtime environments:

1. Node.js 14+
2. Modern browsers (Chromium/Firefox/Safari, no Internet Explorer or
   [Edge Spartan](https://en.wikipedia.org/wiki/Microsoft_Edge#Development))
3. Browser extensions (Chromium/Firefox)

Our current JavaScript target standard is ES2018. We use WebAssembly to
implement certain cryptographic functions.

We're happy to adjust this list according to users' needs as long as you don't
ask for Internet Explorer support. If your environment does not support Wasm, we
can work on a solution with swappable implementations.

## Webpack Configs

With WebPack 5, you have to be explicit about the usage of Node.js types and
modules that were simply replaced with re-implementations for browsers in
Webpack 4.

Configs for 0.28 and later:

```js
module.exports = [
  {
    // ...
    plugins: [
      ...,
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    // ...
    resolve: {
      fallback: {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: false,
        string_decoder: false,
      },
    },
  },
];
```

Configs for AIOZJS < 0.28

```js
module.exports = [
  {
    // ...
    plugins: [
      ...,
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    // ...
    resolve: {
      fallback: {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: require.resolve("stream-browserify"),
        string_decoder: false,
      },
    },
  },
];
```

## Roadmap

We maintain a [development board](https://github.com/orgs/cosmos/projects/6),
use [release milestones](https://github.com/AIOZNetwork/aiozjs/milestones) and share
important updates in the [CosmWasm Community Call]. For higher level roadmap
discussion please reach out to the team.

[cosmwasm community call]:
  https://github.com/CosmWasm/cosmwasm/issues?q=label%3A%22Community+Call+%F0%9F%97%BA%F0%9F%93%9E%22

## Known limitations

### 0.26

1. When connecting to a Cosmos SDK 0.44+ backend, the verified queries from
   `AuthExtension` and `BankExtension` as well as
   `StargateClient.getAccountVerified` will fail because the storage keys are
   not stable. Unverified queries can be used instead. Those queries are
   deprecated now and will be removed in 0.27 ([#910]).

[#910]: https://github.com/AIOZNetwork/aiozjs/pull/910

### 0.25

1. Decoding blocks of height 1 is unsupported. This is fixed in [#815] and will
   be released as part of AIOZJS 0.26.

[#815]: https://github.com/AIOZNetwork/aiozjs/pull/815

### 0.24

1. `AuthExtension` and all higher level Stargate clients only support
   `BaseAccount`s for all functionality, including getting account numbers and
   sequences for transaction signing. This will be implemented for all common
   Cosmos SDK account types in the 0.25 series.

## Get in touch

The AIOZJS development team is happy to get in touch with you for all questions
and suggestions.

- [GitHub issues](https://github.com/AIOZNetwork/aiozjs/issues) for bugs and feature
  requests
- The #aiozjs channel on the
  ["Cosmos Community" Discord server](https://discord.gg/vcExX9T) for questions
  and open discussions
- [#AIOZJS on Twitter](https://twitter.com/search?q=%23AIOZJS) to spread the
  word

## Development

See [HACKING.md](HACKING.md).
