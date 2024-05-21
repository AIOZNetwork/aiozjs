/* eslint-disable */
import { BaseEntry } from "../../cron/v1/cron";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "aioz.burn.v1";
/** Params holds parameters for the burn module. */

export interface Params {
  txFeesBurnRate: string;
  txFeesBurnAccount: string;
}
/** BurnAccount defines cron schedule for the burn account. */

export interface BurnAccount {
  baseEntry?: BaseEntry;
}

function createBaseParams(): Params {
  return {
    txFeesBurnRate: "",
    txFeesBurnAccount: "",
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txFeesBurnRate !== "") {
      writer.uint32(10).string(message.txFeesBurnRate);
    }

    if (message.txFeesBurnAccount !== "") {
      writer.uint32(18).string(message.txFeesBurnAccount);
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
          message.txFeesBurnRate = reader.string();
          break;

        case 2:
          message.txFeesBurnAccount = reader.string();
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
      txFeesBurnRate: isSet(object.txFeesBurnRate) ? String(object.txFeesBurnRate) : "",
      txFeesBurnAccount: isSet(object.txFeesBurnAccount) ? String(object.txFeesBurnAccount) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.txFeesBurnRate !== undefined && (obj.txFeesBurnRate = message.txFeesBurnRate);
    message.txFeesBurnAccount !== undefined && (obj.txFeesBurnAccount = message.txFeesBurnAccount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.txFeesBurnRate = object.txFeesBurnRate ?? "";
    message.txFeesBurnAccount = object.txFeesBurnAccount ?? "";
    return message;
  },
};

function createBaseBurnAccount(): BurnAccount {
  return {
    baseEntry: undefined,
  };
}

export const BurnAccount = {
  encode(message: BurnAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseEntry !== undefined) {
      BaseEntry.encode(message.baseEntry, writer.uint32(10).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BurnAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBurnAccount();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.baseEntry = BaseEntry.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): BurnAccount {
    return {
      baseEntry: isSet(object.baseEntry) ? BaseEntry.fromJSON(object.baseEntry) : undefined,
    };
  },

  toJSON(message: BurnAccount): unknown {
    const obj: any = {};
    message.baseEntry !== undefined &&
      (obj.baseEntry = message.baseEntry ? BaseEntry.toJSON(message.baseEntry) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BurnAccount>, I>>(object: I): BurnAccount {
    const message = createBaseBurnAccount();
    message.baseEntry =
      object.baseEntry !== undefined && object.baseEntry !== null
        ? BaseEntry.fromPartial(object.baseEntry)
        : undefined;
    return message;
  },
};
