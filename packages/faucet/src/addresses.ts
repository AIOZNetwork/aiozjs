import { Bech32 } from "@cosmjs/encoding";
import { checkEthAddressChecksum } from "@cosmjs/amino";

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
