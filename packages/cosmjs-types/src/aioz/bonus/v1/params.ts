/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "aioz.bonus.v1";
/** Params holds parameters for the bonus module. */
export interface Params {
  /** type of coin for bonus */
  bonusDenom: string;
  /** bonus amount per block */
  bonusAmount: string;
}
function createBaseParams(): Params {
  return {
    bonusDenom: "",
    bonusAmount: "",
  };
}
export const Params = {
  typeUrl: "/aioz.bonus.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.bonusDenom !== "") {
      writer.uint32(10).string(message.bonusDenom);
    }
    if (message.bonusAmount !== "") {
      writer.uint32(18).string(message.bonusAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bonusDenom = reader.string();
          break;
        case 2:
          message.bonusAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Params {
    const obj = createBaseParams();
    if (isSet(object.bonusDenom)) obj.bonusDenom = String(object.bonusDenom);
    if (isSet(object.bonusAmount)) obj.bonusAmount = String(object.bonusAmount);
    return obj;
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    message.bonusDenom !== undefined && (obj.bonusDenom = message.bonusDenom);
    message.bonusAmount !== undefined && (obj.bonusAmount = message.bonusAmount);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.bonusDenom = object.bonusDenom ?? "";
    message.bonusAmount = object.bonusAmount ?? "";
    return message;
  },
};
