/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "ethermint.types.v1";
/** TxResult is the value stored in eth tx indexer */
export interface TxResult {
  /** height of the blockchain */
  height: bigint;
  /** tx_index of the cosmos transaction */
  txIndex: number;
  /** msg_index in a batch transaction */
  msgIndex: number;
  /**
   * eth_tx_index is the index in the list of valid eth tx in the block,
   * aka. the transaction list returned by eth_getBlock api.
   */
  ethTxIndex: number;
  /** failed is true if the eth transaction did not go succeed */
  failed: boolean;
  /**
   * gas_used by the transaction. If it exceeds the block gas limit,
   * it's set to gas limit, which is what's actually deducted by ante handler.
   */
  gasUsed: bigint;
  /**
   * cumulative_gas_used specifies the cumulated amount of gas used for all
   * processed messages within the current batch transaction.
   */
  cumulativeGasUsed: bigint;
}
function createBaseTxResult(): TxResult {
  return {
    height: BigInt(0),
    txIndex: 0,
    msgIndex: 0,
    ethTxIndex: 0,
    failed: false,
    gasUsed: BigInt(0),
    cumulativeGasUsed: BigInt(0),
  };
}
export const TxResult = {
  typeUrl: "/ethermint.types.v1.TxResult",
  encode(message: TxResult, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).int64(message.height);
    }
    if (message.txIndex !== 0) {
      writer.uint32(16).uint32(message.txIndex);
    }
    if (message.msgIndex !== 0) {
      writer.uint32(24).uint32(message.msgIndex);
    }
    if (message.ethTxIndex !== 0) {
      writer.uint32(32).int32(message.ethTxIndex);
    }
    if (message.failed === true) {
      writer.uint32(40).bool(message.failed);
    }
    if (message.gasUsed !== BigInt(0)) {
      writer.uint32(48).uint64(message.gasUsed);
    }
    if (message.cumulativeGasUsed !== BigInt(0)) {
      writer.uint32(56).uint64(message.cumulativeGasUsed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TxResult {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int64();
          break;
        case 2:
          message.txIndex = reader.uint32();
          break;
        case 3:
          message.msgIndex = reader.uint32();
          break;
        case 4:
          message.ethTxIndex = reader.int32();
          break;
        case 5:
          message.failed = reader.bool();
          break;
        case 6:
          message.gasUsed = reader.uint64();
          break;
        case 7:
          message.cumulativeGasUsed = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TxResult {
    const obj = createBaseTxResult();
    if (isSet(object.height)) obj.height = BigInt(object.height.toString());
    if (isSet(object.txIndex)) obj.txIndex = Number(object.txIndex);
    if (isSet(object.msgIndex)) obj.msgIndex = Number(object.msgIndex);
    if (isSet(object.ethTxIndex)) obj.ethTxIndex = Number(object.ethTxIndex);
    if (isSet(object.failed)) obj.failed = Boolean(object.failed);
    if (isSet(object.gasUsed)) obj.gasUsed = BigInt(object.gasUsed.toString());
    if (isSet(object.cumulativeGasUsed)) obj.cumulativeGasUsed = BigInt(object.cumulativeGasUsed.toString());
    return obj;
  },
  toJSON(message: TxResult): JsonSafe<TxResult> {
    const obj: any = {};
    message.height !== undefined && (obj.height = (message.height || BigInt(0)).toString());
    message.txIndex !== undefined && (obj.txIndex = Math.round(message.txIndex));
    message.msgIndex !== undefined && (obj.msgIndex = Math.round(message.msgIndex));
    message.ethTxIndex !== undefined && (obj.ethTxIndex = Math.round(message.ethTxIndex));
    message.failed !== undefined && (obj.failed = message.failed);
    message.gasUsed !== undefined && (obj.gasUsed = (message.gasUsed || BigInt(0)).toString());
    message.cumulativeGasUsed !== undefined &&
      (obj.cumulativeGasUsed = (message.cumulativeGasUsed || BigInt(0)).toString());
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<TxResult>, I>>(object: I): TxResult {
    const message = createBaseTxResult();
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height.toString());
    }
    message.txIndex = object.txIndex ?? 0;
    message.msgIndex = object.msgIndex ?? 0;
    message.ethTxIndex = object.ethTxIndex ?? 0;
    message.failed = object.failed ?? false;
    if (object.gasUsed !== undefined && object.gasUsed !== null) {
      message.gasUsed = BigInt(object.gasUsed.toString());
    }
    if (object.cumulativeGasUsed !== undefined && object.cumulativeGasUsed !== null) {
      message.cumulativeGasUsed = BigInt(object.cumulativeGasUsed.toString());
    }
    return message;
  },
};
