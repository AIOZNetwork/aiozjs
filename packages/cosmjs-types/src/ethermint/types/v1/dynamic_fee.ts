/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "ethermint.types.v1";
/**
 * ExtensionOptionDynamicFeeTx is an extension option that specifies the
 * maxPrioPrice for cosmos tx
 */
export interface ExtensionOptionDynamicFeeTx {
  /**
   * max_priority_price is the same as `max_priority_fee_per_gas` in eip-1559
   * spec
   */
  maxPriorityPrice: string;
}
function createBaseExtensionOptionDynamicFeeTx(): ExtensionOptionDynamicFeeTx {
  return {
    maxPriorityPrice: "",
  };
}
export const ExtensionOptionDynamicFeeTx = {
  typeUrl: "/ethermint.types.v1.ExtensionOptionDynamicFeeTx",
  encode(message: ExtensionOptionDynamicFeeTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maxPriorityPrice !== "") {
      writer.uint32(10).string(message.maxPriorityPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ExtensionOptionDynamicFeeTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtensionOptionDynamicFeeTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxPriorityPrice = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ExtensionOptionDynamicFeeTx {
    const obj = createBaseExtensionOptionDynamicFeeTx();
    if (isSet(object.maxPriorityPrice)) obj.maxPriorityPrice = String(object.maxPriorityPrice);
    return obj;
  },
  toJSON(message: ExtensionOptionDynamicFeeTx): JsonSafe<ExtensionOptionDynamicFeeTx> {
    const obj: any = {};
    message.maxPriorityPrice !== undefined && (obj.maxPriorityPrice = message.maxPriorityPrice);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<ExtensionOptionDynamicFeeTx>, I>>(
    object: I,
  ): ExtensionOptionDynamicFeeTx {
    const message = createBaseExtensionOptionDynamicFeeTx();
    message.maxPriorityPrice = object.maxPriorityPrice ?? "";
    return message;
  },
};
