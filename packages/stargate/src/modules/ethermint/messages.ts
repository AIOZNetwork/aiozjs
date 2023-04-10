import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing";
import { DynamicFeeTx } from "cosmjs-types/ethermint/evm/v1/tx";

export const evmTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/ethermint.evm.v1.DynamicFeeTx", DynamicFeeTx],
];

export interface DynamicFeeTxEncodeObject extends EncodeObject {
  readonly typeUrl: "/ethermint.evm.v1.DynamicFeeTx";
  readonly value: Partial<DynamicFeeTx>;
}

export function isDynamicFeeTxEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is DynamicFeeTxEncodeObject {
  return (encodeObject as DynamicFeeTxEncodeObject).typeUrl === "/ethermint.evm.v1.DynamicFeeTx";
}
