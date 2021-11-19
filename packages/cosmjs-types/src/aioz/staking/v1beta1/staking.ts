/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";

export const protobufPackage = "aioz.staking.v1beta1";

/** Params defines the parameters for the staking module. */
export interface Params {
  /** unbonding_time is the time duration of unbonding. */
  unbondingTime?: Duration;
  /** max_validators is the maximum number of validators. */
  maxValidators: number;
  /** max_entries is the max entries for either unbonding delegation or redelegation (per pair/trio). */
  maxEntries: number;
  /** historical_entries is the number of historical entries to persist. */
  historicalEntries: number;
  /** bond_denom defines the bondable coin denomination. */
  bondDenom: string;
  /** accept_all_validators is to allow create validator without gov */
  acceptAllValidators: boolean;
}

const baseParams: object = {
  maxValidators: 0,
  maxEntries: 0,
  historicalEntries: 0,
  bondDenom: "",
  acceptAllValidators: false,
};

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.unbondingTime !== undefined) {
      Duration.encode(message.unbondingTime, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxValidators !== 0) {
      writer.uint32(16).uint32(message.maxValidators);
    }
    if (message.maxEntries !== 0) {
      writer.uint32(24).uint32(message.maxEntries);
    }
    if (message.historicalEntries !== 0) {
      writer.uint32(32).uint32(message.historicalEntries);
    }
    if (message.bondDenom !== "") {
      writer.uint32(42).string(message.bondDenom);
    }
    if (message.acceptAllValidators === true) {
      writer.uint32(808).bool(message.acceptAllValidators);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbondingTime = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.maxValidators = reader.uint32();
          break;
        case 3:
          message.maxEntries = reader.uint32();
          break;
        case 4:
          message.historicalEntries = reader.uint32();
          break;
        case 5:
          message.bondDenom = reader.string();
          break;
        case 101:
          message.acceptAllValidators = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    if (object.unbondingTime !== undefined && object.unbondingTime !== null) {
      message.unbondingTime = Duration.fromJSON(object.unbondingTime);
    } else {
      message.unbondingTime = undefined;
    }
    if (object.maxValidators !== undefined && object.maxValidators !== null) {
      message.maxValidators = Number(object.maxValidators);
    } else {
      message.maxValidators = 0;
    }
    if (object.maxEntries !== undefined && object.maxEntries !== null) {
      message.maxEntries = Number(object.maxEntries);
    } else {
      message.maxEntries = 0;
    }
    if (object.historicalEntries !== undefined && object.historicalEntries !== null) {
      message.historicalEntries = Number(object.historicalEntries);
    } else {
      message.historicalEntries = 0;
    }
    if (object.bondDenom !== undefined && object.bondDenom !== null) {
      message.bondDenom = String(object.bondDenom);
    } else {
      message.bondDenom = "";
    }
    if (object.acceptAllValidators !== undefined && object.acceptAllValidators !== null) {
      message.acceptAllValidators = Boolean(object.acceptAllValidators);
    } else {
      message.acceptAllValidators = false;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.unbondingTime !== undefined &&
      (obj.unbondingTime = message.unbondingTime ? Duration.toJSON(message.unbondingTime) : undefined);
    message.maxValidators !== undefined && (obj.maxValidators = message.maxValidators);
    message.maxEntries !== undefined && (obj.maxEntries = message.maxEntries);
    message.historicalEntries !== undefined && (obj.historicalEntries = message.historicalEntries);
    message.bondDenom !== undefined && (obj.bondDenom = message.bondDenom);
    message.acceptAllValidators !== undefined && (obj.acceptAllValidators = message.acceptAllValidators);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.unbondingTime !== undefined && object.unbondingTime !== null) {
      message.unbondingTime = Duration.fromPartial(object.unbondingTime);
    } else {
      message.unbondingTime = undefined;
    }
    if (object.maxValidators !== undefined && object.maxValidators !== null) {
      message.maxValidators = object.maxValidators;
    } else {
      message.maxValidators = 0;
    }
    if (object.maxEntries !== undefined && object.maxEntries !== null) {
      message.maxEntries = object.maxEntries;
    } else {
      message.maxEntries = 0;
    }
    if (object.historicalEntries !== undefined && object.historicalEntries !== null) {
      message.historicalEntries = object.historicalEntries;
    } else {
      message.historicalEntries = 0;
    }
    if (object.bondDenom !== undefined && object.bondDenom !== null) {
      message.bondDenom = object.bondDenom;
    } else {
      message.bondDenom = "";
    }
    if (object.acceptAllValidators !== undefined && object.acceptAllValidators !== null) {
      message.acceptAllValidators = object.acceptAllValidators;
    } else {
      message.acceptAllValidators = false;
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
