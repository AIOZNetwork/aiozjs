import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { ExtensionOptionDynamicFeeTx } from "cosmjs-types/ethermint/types/v1/dynamic_fee";
import { ExtensionOptionsWeb3Tx } from "cosmjs-types/ethermint/types/v1/web3";

export const ethermintTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/ethermint.types.v1.ExtensionOptionsWeb3Tx", ExtensionOptionsWeb3Tx],
  ["/ethermint.types.v1.ExtensionOptionDynamicFeeTx", ExtensionOptionDynamicFeeTx],
];

export interface ExtensionOptionsWeb3TxEncodeObject extends EncodeObject {
  readonly typeUrl: "/ethermint.types.v1.ExtensionOptionsWeb3Tx";
  readonly value: Partial<ExtensionOptionsWeb3Tx>;
}

export function isExtensionOptionsWeb3TxEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is ExtensionOptionsWeb3TxEncodeObject {
  return (
    (encodeObject as ExtensionOptionsWeb3TxEncodeObject).typeUrl ===
    "/ethermint.types.v1.ExtensionOptionsWeb3Tx"
  );
}

export interface ExtensionOptionDynamicFeeTxEncodeObject extends EncodeObject {
  readonly typeUrl: "/ethermint.types.v1.ExtensionOptionDynamicFeeTx";
  readonly value: Partial<ExtensionOptionDynamicFeeTx>;
}

export function isExtensionOptionDynamicFeeTxEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is ExtensionOptionDynamicFeeTxEncodeObject {
  return (
    (encodeObject as ExtensionOptionDynamicFeeTxEncodeObject).typeUrl ===
    "/ethermint.types.v1.ExtensionOptionDynamicFeeTx"
  );
}
