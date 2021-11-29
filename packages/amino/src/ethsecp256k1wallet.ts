import { Secp256k1, Keccak256 } from "@cosmjs/crypto";
import { Bech32, fromHex, fromBase64, fromUtf8, toHex, toBase64, toUtf8 } from "@cosmjs/encoding";
import { assert, isNonNullObject } from "@cosmjs/utils/build";

import { ethAddressChecksum, rawEthSecp256k1PubkeyToRawAddress } from "./addresses";
import { encodeEthSecp256k1Signature } from "./signature";
import { serializeSignDoc, StdSignDoc } from "./signdoc";
import { AccountData, AminoSignResponse, OfflineAminoSigner } from "./signer";
import {
  decrypt,
  encrypt,
  EncryptionConfiguration,
  executeKdf,
  KdfConfiguration,
  supportedAlgorithms,
} from "./wallet";

const serializationTypeV1 = "ethsecp256k1wallet-v1";

/**
 * A KDF configuration that is not very strong but can be used on the main thread.
 * It takes about 1 second in Node.js 16.0.0 and should have similar runtimes in other modern Wasm hosts.
 */
const basicPasswordHashingOptions: KdfConfiguration = {
  algorithm: "argon2id",
  params: {
    outputLength: 32,
    opsLimit: 24,
    memLimitKib: 12 * 1024,
  },
};

/**
 * This interface describes a JSON object holding the encrypted wallet and the meta data.
 * All fields in here must be JSON types.
 */
export interface EthSecp256k1WalletSerialization {
  /** A format+version identifier for this serialization format */
  readonly type: string;
  /** Information about the key derivation function (i.e. password to encryption key) */
  readonly kdf: KdfConfiguration;
  /** Information about the symmetric encryption */
  readonly encryption: EncryptionConfiguration;
  /** An instance of DirectEthSecp256k1WalletData, which is stringified, encrypted and base64 encoded. */
  readonly data: string;
}

/**
 * The data of a wallet serialization that is encrypted.
 * All fields in here must be JSON types.
 */
 interface EthSecp256k1WalletData {
  readonly privkey: string;
  readonly prefix: string;
}

function extractKdfConfigurationV1(doc: any): KdfConfiguration {
  return doc.kdf;
}

export function extractKdfConfiguration(serialization: string): KdfConfiguration {
  const root = JSON.parse(serialization);
  if (!isNonNullObject(root)) throw new Error("Root document is not an object.");

  switch ((root as any).type) {
    case serializationTypeV1:
      return extractKdfConfigurationV1(root);
    default:
      throw new Error("Unsupported serialization type");
  }
}

/**
 * A wallet that holds a single secp256k1 keypair.
 *
 * If you want to work with BIP39 mnemonics and multiple accounts, use Secp256k1HdWallet.
 */
export class EthSecp256k1Wallet implements OfflineAminoSigner {
  /**
   * Creates a Secp256k1Wallet from the given private key
   *
   * @param privkey The private key.
   * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
   */
  public static async fromKey(privkey: Uint8Array, prefix = "aioz"): Promise<EthSecp256k1Wallet> {
    const uncompressed = (await Secp256k1.makeKeypair(privkey)).pubkey;
    return new EthSecp256k1Wallet(privkey, Secp256k1.compressPubkey(uncompressed), prefix);
  }

  /**
   * Restores a wallet from an encrypted serialization.
   *
   * @param password The user provided password used to generate an encryption key via a KDF.
   *                 This is not normalized internally (see "Unicode normalization" to learn more).
   */
   public static async deserialize(serialization: string, password: string): Promise<EthSecp256k1Wallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    switch ((root as any).type) {
      case serializationTypeV1:
        return EthSecp256k1Wallet.deserializeTypeV1(serialization, password);
      default:
        throw new Error("Unsupported serialization type");
    }
  }
  /**
   * Restores a wallet from an encrypted serialization.
   *
   * This is an advanced alternative to calling `deserialize(serialization, password)` directly, which allows
   * you to offload the KDF execution to a non-UI thread (e.g. in a WebWorker).
   *
   * The caller is responsible for ensuring the key was derived with the given KDF configuration. This can be
   * done using `extractKdfConfiguration(serialization)` and `executeKdf(password, kdfConfiguration)` from this package.
   */
  public static async deserializeWithEncryptionKey(
    serialization: string,
    encryptionKey: Uint8Array,
  ): Promise<EthSecp256k1Wallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    const untypedRoot: any = root;
    switch (untypedRoot.type) {
      case serializationTypeV1: {
        const decryptedBytes = await decrypt(
          fromBase64(untypedRoot.data),
          encryptionKey,
          untypedRoot.encryption,
        );
        const decryptedDocument = JSON.parse(fromUtf8(decryptedBytes));
        const { privkey, prefix } = decryptedDocument;
        assert(typeof privkey === "string");
        assert(typeof prefix === "string");
        return EthSecp256k1Wallet.fromKey(fromHex(privkey), prefix);
      }
      default:
        throw new Error("Unsupported serialization type");
    }
  }

  private static async deserializeTypeV1(
    serialization: string,
    password: string,
  ): Promise<EthSecp256k1Wallet> {
    const root = JSON.parse(serialization);
    if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
    const encryptionKey = await executeKdf(password, (root as any).kdf);
    return EthSecp256k1Wallet.deserializeWithEncryptionKey(serialization, encryptionKey);
  }

  private readonly pubkey: Uint8Array;
  private readonly privkey: Uint8Array;
  private readonly prefix: string;

  private constructor(privkey: Uint8Array, pubkey: Uint8Array, prefix: string) {
    this.privkey = privkey;
    this.pubkey = pubkey;
    this.prefix = prefix;
  }

  private get address(): string {
    return Bech32.encode(this.prefix, rawEthSecp256k1PubkeyToRawAddress(this.pubkey));
  }

  private get addressHex(): string {
    return ethAddressChecksum(rawEthSecp256k1PubkeyToRawAddress(this.pubkey));
  }

  public async getAccounts(): Promise<readonly AccountData[]> {
    return [
      {
        algo: "eth_secp256k1",
        address: this.address,
        addressHex: this.addressHex,
        pubkey: this.pubkey,
      },
    ];
  }

  public async signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse> {
    if (signerAddress !== this.address) {
      throw new Error(`Address ${signerAddress} not found in wallet`);
    }
    const message = new Keccak256(serializeSignDoc(signDoc)).digest();
    const signature = await Secp256k1.createSignature(message, this.privkey);
    const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32), signature.recovery]);
    return {
      signed: signDoc,
      signature: encodeEthSecp256k1Signature(this.pubkey, signatureBytes),
    };
  }

  /**
   * Generates an encrypted serialization of this wallet.
   *
   * @param password The user provided password used to generate an encryption key via a KDF.
   *                 This is not normalized internally (see "Unicode normalization" to learn more).
   */
   public async serialize(password: string): Promise<string> {
    const kdfConfiguration = basicPasswordHashingOptions;
    const encryptionKey = await executeKdf(password, kdfConfiguration);
    return this.serializeWithEncryptionKey(encryptionKey, kdfConfiguration);
  }

  /**
   * Generates an encrypted serialization of this wallet.
   *
   * This is an advanced alternative to calling `serialize(password)` directly, which allows you to
   * offload the KDF execution to a non-UI thread (e.g. in a WebWorker).
   *
   * The caller is responsible for ensuring the key was derived with the given KDF options. If this
   * is not the case, the wallet cannot be restored with the original password.
   */
  public async serializeWithEncryptionKey(
    encryptionKey: Uint8Array,
    kdfConfiguration: KdfConfiguration,
  ): Promise<string> {
    const dataToEncrypt: EthSecp256k1WalletData = {
      privkey: toHex(this.privkey),
      prefix: this.prefix,
    };
    const dataToEncryptRaw = toUtf8(JSON.stringify(dataToEncrypt));

    const encryptionConfiguration: EncryptionConfiguration = {
      algorithm: supportedAlgorithms.xchacha20poly1305Ietf,
    };
    const encryptedData = await encrypt(dataToEncryptRaw, encryptionKey, encryptionConfiguration);

    const out: EthSecp256k1WalletSerialization = {
      type: serializationTypeV1,
      kdf: kdfConfiguration,
      encryption: encryptionConfiguration,
      data: toBase64(encryptedData),
    };
    return JSON.stringify(out);
  }
}
