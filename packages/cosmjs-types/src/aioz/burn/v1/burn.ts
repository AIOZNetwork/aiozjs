/* eslint-disable */
import { BaseEntry } from "../../cron/v1/cron";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
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
  typeUrl: "/aioz.burn.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.txFeesBurnRate !== "") {
      writer.uint32(10).string(message.txFeesBurnRate);
    }
    if (message.txFeesBurnAccount !== "") {
      writer.uint32(18).string(message.txFeesBurnAccount);
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
    const obj = createBaseParams();
    if (isSet(object.txFeesBurnRate)) obj.txFeesBurnRate = String(object.txFeesBurnRate);
    if (isSet(object.txFeesBurnAccount)) obj.txFeesBurnAccount = String(object.txFeesBurnAccount);
    return obj;
  },
  toJSON(message: Params): JsonSafe<Params> {
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
  typeUrl: "/aioz.burn.v1.BurnAccount",
  encode(message: BurnAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.baseEntry !== undefined) {
      BaseEntry.encode(message.baseEntry, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BurnAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
    const obj = createBaseBurnAccount();
    if (isSet(object.baseEntry)) obj.baseEntry = BaseEntry.fromJSON(object.baseEntry);
    return obj;
  },
  toJSON(message: BurnAccount): JsonSafe<BurnAccount> {
    const obj: any = {};
    message.baseEntry !== undefined &&
      (obj.baseEntry = message.baseEntry ? BaseEntry.toJSON(message.baseEntry) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<BurnAccount>, I>>(object: I): BurnAccount {
    const message = createBaseBurnAccount();
    if (object.baseEntry !== undefined && object.baseEntry !== null) {
      message.baseEntry = BaseEntry.fromPartial(object.baseEntry);
    }
    return message;
  },
};
