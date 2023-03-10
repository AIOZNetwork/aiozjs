// See https://github.com/tendermint/tendermint/blob/f2ada0a604b4c0763bda2f64fac53d506d3beca7/docs/spec/blockchain/encoding.md#public-key-cryptography

import { keccak256, ripemd160, Secp256k1, sha256 } from "@cosmjs/crypto";
import { Bech32, fromBase64, fromHex, toHex, toUtf8 } from "@cosmjs/encoding";

import { encodeAminoPubkey } from "./encoding";
import {
  isEd25519Pubkey,
  isEthSecp256k1Pubkey,
  isMultisigThresholdPubkey,
  isSecp256k1Pubkey,
  Pubkey,
} from "./pubkeys";

export function rawEd25519PubkeyToRawAddress(pubkeyData: Uint8Array): Uint8Array {
  if (pubkeyData.length !== 32) {
    throw new Error(`Invalid Ed25519 pubkey length: ${pubkeyData.length}`);
  }
  return sha256(pubkeyData).slice(0, 20);
}

export function rawSecp256k1PubkeyToRawAddress(pubkeyData: Uint8Array): Uint8Array {
  if (pubkeyData.length !== 33) {
    throw new Error(`Invalid Secp256k1 pubkey length (compressed): ${pubkeyData.length}`);
  }
  return ripemd160(sha256(pubkeyData));
}

export function rawEthSecp256k1PubkeyToRawAddress(pubkeyData: Uint8Array): Uint8Array {
  if (pubkeyData.length !== 33) {
    throw new Error(`Invalid EthSecp256k1 pubkey length (compressed): ${pubkeyData.length}`);
  }
  return keccak256(Secp256k1.uncompressPubkey(pubkeyData).slice(1)).slice(-20);
}

// For secp256k1 this assumes we already have a compressed pubkey.
export function pubkeyToRawAddress(pubkey: Pubkey): Uint8Array {
  if (isSecp256k1Pubkey(pubkey)) {
    const pubkeyData = fromBase64(pubkey.value);
    return rawSecp256k1PubkeyToRawAddress(pubkeyData);
  } else if (isEthSecp256k1Pubkey(pubkey)) {
    const pubkeyData = fromBase64(pubkey.value);
    return rawEthSecp256k1PubkeyToRawAddress(pubkeyData);
  } else if (isEd25519Pubkey(pubkey)) {
    const pubkeyData = fromBase64(pubkey.value);
    return rawEd25519PubkeyToRawAddress(pubkeyData);
  } else if (isMultisigThresholdPubkey(pubkey)) {
    // https://github.com/tendermint/tendermint/blob/38b401657e4ad7a7eeb3c30a3cbf512037df3740/crypto/multisig/threshold_pubkey.go#L71-L74
    const pubkeyData = encodeAminoPubkey(pubkey);
    return sha256(pubkeyData).slice(0, 20);
  } else {
    throw new Error("Unsupported public key type");
  }
}

export function ethAddressChecksumRaw(rawAddress: Uint8Array): string {
  const address = toHex(rawAddress);
  const addressHash = toHex(keccak256(toUtf8(address)));
  let checksumAddress = "0x";
  for (let i = 0; i < address.length; i++) {
    checksumAddress += parseInt(addressHash[i], 16) > 7 ? address[i].toUpperCase() : address[i];
  }
  return checksumAddress;
}

export function ethAddressChecksum(address: string): string {
  address = address.replace(/^0x/i, "").toLowerCase();
  const addressHash = toHex(keccak256(toUtf8(address)));
  let checksumAddress = "0x";
  for (let i = 0; i < address.length; i++) {
    checksumAddress += parseInt(addressHash[i], 16) > 7 ? address[i].toUpperCase() : address[i];
  }
  return checksumAddress;
}

export function checkEthAddressChecksum(address: string): boolean {
  // Check each case
  address = address.replace(/^0x/i, "");
  const addressHash = toHex(keccak256(toUtf8(address.toLowerCase())));

  for (let i = 0; i < address.length; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if (
      (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])
    ) {
      return false;
    }
  }
  return true;
}

export function isValidAddress(input: string, requiredPrefix: string): boolean {
  return isValidHexAddress(input) || isValidBech32Address(input, requiredPrefix);
}

export function isValidHexAddress(input: string): boolean {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(input)) {
    return false;
    // If it's ALL lowercase or ALL upppercase
  } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(input) || /^(0x|0X)?[0-9A-F]{40}$/.test(input)) {
    return true;
    // Otherwise check each case
  } else {
    return checkEthAddressChecksum(input);
  }
}

export function isValidBech32Address(input: string, requiredPrefix: string): boolean {
  try {
    const { prefix, data } = Bech32.decode(input);
    if (prefix !== requiredPrefix) {
      return false;
    }
    return data.length === 20;
  } catch {
    return false;
  }
}

export function hexToAddress(address: string, prefix: string): string {
  if (isValidBech32Address(address, prefix)) {
    return address;
  }
  if (isValidHexAddress(address)) {
    return Bech32.encode(prefix, fromHex(address.slice(2).toLowerCase()));
  }
  throw new Error("address is invalid");
}

export function addressToHex(address: string): string {
  if (isValidHexAddress(address)) {
    return address;
  }
  const { data } = Bech32.decode(address);
  return ethAddressChecksumRaw(data);
}

export function pubkeyToAddress(pubkey: Pubkey, prefix: string): string {
  return Bech32.encode(prefix, pubkeyToRawAddress(pubkey));
}

export function pubkeyToAddressHex(pubkey: Pubkey): string {
  return ethAddressChecksumRaw(pubkeyToRawAddress(pubkey));
}
