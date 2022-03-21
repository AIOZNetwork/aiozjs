import { ecrecover, fromRpcSig } from 'ethereumjs-util';
import Long from "long";


/**
 * Recover the public key from the given signature and message hash.
 *
 * @param messageHash - The hash of the signed message.
 * @param signature - The signature.
 * @returns The public key of the signer.
 */
export function recoverPublicKey(
  messageHash: Buffer,
  signature: string,
): Buffer {
  const sigParams = fromRpcSig(signature);
  return ecrecover(messageHash, sigParams.v, sigParams.r, sigParams.s);
}


const chainIdRegex = /^([a-z]{1,})_{1}([1-9][0-9]*)-{1}([1-9][0-9]*)$/

export function parseChainId(chainId: string): Long {
	chainId = chainId.trim();
	if (chainId.length > 48) {
    throw new Error(`invalid chainId: chain-id '${chainId}' cannot exceed 48 chars`);
	}

	const matches = chainIdRegex.exec(chainId);
	if (!matches || matches.length != 4 || matches[1] == "") {
    throw new Error(`invalid chainId: ${chainId}: ${matches}`);
	}

	// verify that the chain-id entered is a base 10 integer
	return Long.fromString(matches[2], true, 10);
}