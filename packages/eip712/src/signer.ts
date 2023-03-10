import { OfflineAminoSigner, StdSignDoc } from "@cosmjs/amino";
import { Algo, OfflineDirectSigner } from "@cosmjs/proto-signing";

export interface AccountData {
  readonly address: string;
  readonly addressHex: string;
}

export interface EIP712SignResponse {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: StdSignDoc;
  readonly signature: Uint8Array;
  readonly pubkey: Uint8Array;
}

export interface OfflineEIP712Signer {
  readonly getAccounts: () => Promise<readonly AccountData[]>;
  readonly signEIP712: (signerAddress: string, signDoc: StdSignDoc) => Promise<EIP712SignResponse>;
}

export type OfflineSigner = OfflineAminoSigner | OfflineDirectSigner | OfflineEIP712Signer;

export function isOfflineEIP712Signer(signer: OfflineSigner): signer is OfflineEIP712Signer {
  return (signer as OfflineEIP712Signer).signEIP712 !== undefined;
}

export function isOfflineDirectSigner(signer: OfflineSigner): signer is OfflineDirectSigner {
  return (signer as OfflineDirectSigner).signDirect !== undefined;
}
