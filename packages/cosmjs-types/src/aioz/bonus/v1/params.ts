/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact } from "../../../helpers";
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
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bonusDenom !== "") {
      writer.uint32(10).string(message.bonusDenom);
    }

    if (message.bonusAmount !== "") {
      writer.uint32(18).string(message.bonusAmount);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    return {
      bonusDenom: isSet(object.bonusDenom) ? String(object.bonusDenom) : "",
      bonusAmount: isSet(object.bonusAmount) ? String(object.bonusAmount) : "",
    };
  },

  toJSON(message: Params): unknown {
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
