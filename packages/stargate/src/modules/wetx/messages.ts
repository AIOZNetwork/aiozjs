import { EncodeObject, GeneratedType, Registry } from "@cosmjs/proto-signing";
import { Common } from "@ethereumjs/common";
import { FeeMarketEIP1559Transaction, FeeMarketEIP1559TxData } from "@ethereumjs/tx";
import { bigIntToHex, bufferToBigInt, toBuffer } from "@ethereumjs/util";
import { ExtensionOptionsWrappedEthereumTx, MsgWrappedEthereumTx } from "cosmjs-types/aioz/wetx/v1/tx";
import { DynamicFeeTx, MsgEthereumTx } from "cosmjs-types/ethermint/evm/v1/tx";
import Long from "long";

import { DynamicFeeTxEncodeObject } from "../ethermint/messages";

export const wetxTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/aioz.wetx.v1.MsgWrappedEthereumTx", MsgWrappedEthereumTx],
  ["/aioz.wetx.v1.ExtensionOptionsWrappedEthereumTx", ExtensionOptionsWrappedEthereumTx],
];

export interface MsgWrappedEthereumTxEncodeObject extends EncodeObject {
  readonly typeUrl: "/aioz.wetx.v1.MsgWrappedEthereumTx";
  readonly value: Partial<MsgWrappedEthereumTx>;
}

export function isMsgWrappedEthereumTxEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgWrappedEthereumTxEncodeObject {
  return (encodeObject as MsgWrappedEthereumTxEncodeObject).typeUrl === "/aioz.wetx.v1.MsgWrappedEthereumTx";
}

export interface ExtensionOptionsWrappedEthereumTxEncodeObject extends EncodeObject {
  readonly typeUrl: "/aioz.wetx.v1.ExtensionOptionsWrappedEthereumTx";
  readonly value: Partial<ExtensionOptionsWrappedEthereumTx>;
}

export function isExtensionOptionsWrappedEthereumTxEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is ExtensionOptionsWrappedEthereumTxEncodeObject {
  return (
    (encodeObject as ExtensionOptionsWrappedEthereumTxEncodeObject).typeUrl ===
    "/aioz.wetx.v1.ExtensionOptionsWrappedEthereumTx"
  );
}

export function createMsgWrappedEthereumTxEncodeObjectFromTxData(
  registry: Registry,
  from: string,
  txData: FeeMarketEIP1559TxData,
): MsgWrappedEthereumTxEncodeObject {
  if (txData.chainId === undefined || txData.chainId === "") {
    throw new Error("invalid chainId");
  }

  const chainId = bufferToBigInt(toBuffer(txData.chainId));
  const common = Common.custom({ chainId: chainId });
  const tx = FeeMarketEIP1559Transaction.fromTxData(txData, { common });

  const dynamicFeeTx: DynamicFeeTxEncodeObject = {
    typeUrl: "/ethermint.evm.v1.DynamicFeeTx",
    value: DynamicFeeTx.fromPartial({
      chainId: bigIntToHex(tx.chainId),
      gasTipCap: bigIntToHex(tx.maxPriorityFeePerGas),
      gasFeeCap: bigIntToHex(tx.maxFeePerGas),
      gas: Long.fromString(bigIntToHex(tx.gasLimit), true, 16),
      to: tx.to?.toString(),
      value: bigIntToHex(tx.value),
      data: Uint8Array.from(tx.data),
    }),
  };
  const encodedDynamicFeeTx = registry.encode(dynamicFeeTx);
  const msg: MsgWrappedEthereumTxEncodeObject = {
    typeUrl: "/aioz.wetx.v1.MsgWrappedEthereumTx",
    value: MsgWrappedEthereumTx.fromPartial({
      msgEthereumTx: MsgEthereumTx.fromPartial({
        data: {
          typeUrl: dynamicFeeTx.typeUrl,
          value: encodedDynamicFeeTx,
        },
        from: from,
      }),
    }),
  };
  return msg;
}
