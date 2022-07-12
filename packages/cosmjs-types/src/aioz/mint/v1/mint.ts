/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "aioz.mint.v1";

/** Params holds parameters for the mint module. */
export interface Params {
  /** type of coin to mint */
  mintDenom: string;
  /** expected blocks per year */
  blocksPerYear: Long;
  /** expected start minting block height */
  startHeight: Long;
  /** current block inflation rate */
  inflation: string;
}

const baseParams: object = {
  mintDenom: "",
  blocksPerYear: Long.UZERO,
  startHeight: Long.ZERO,
  inflation: "",
};

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mintDenom !== "") {
      writer.uint32(10).string(message.mintDenom);
    }
    if (!message.blocksPerYear.isZero()) {
      writer.uint32(16).uint64(message.blocksPerYear);
    }
    if (!message.startHeight.isZero()) {
      writer.uint32(24).int64(message.startHeight);
    }
    if (message.inflation !== "") {
      writer.uint32(34).string(message.inflation);
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
          message.mintDenom = reader.string();
          break;
        case 2:
          message.blocksPerYear = reader.uint64() as Long;
          break;
        case 3:
          message.startHeight = reader.int64() as Long;
          break;
        case 4:
          message.inflation = reader.string();
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
    if (object.mintDenom !== undefined && object.mintDenom !== null) {
      message.mintDenom = String(object.mintDenom);
    } else {
      message.mintDenom = "";
    }
    if (object.blocksPerYear !== undefined && object.blocksPerYear !== null) {
      message.blocksPerYear = Long.fromString(object.blocksPerYear);
    } else {
      message.blocksPerYear = Long.UZERO;
    }
    if (object.startHeight !== undefined && object.startHeight !== null) {
      message.startHeight = Long.fromString(object.startHeight);
    } else {
      message.startHeight = Long.ZERO;
    }
    if (object.inflation !== undefined && object.inflation !== null) {
      message.inflation = String(object.inflation);
    } else {
      message.inflation = "";
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.mintDenom !== undefined && (obj.mintDenom = message.mintDenom);
    message.blocksPerYear !== undefined &&
      (obj.blocksPerYear = (message.blocksPerYear || Long.UZERO).toString());
    message.startHeight !== undefined && (obj.startHeight = (message.startHeight || Long.ZERO).toString());
    message.inflation !== undefined && (obj.inflation = message.inflation);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.mintDenom !== undefined && object.mintDenom !== null) {
      message.mintDenom = object.mintDenom;
    } else {
      message.mintDenom = "";
    }
    if (object.blocksPerYear !== undefined && object.blocksPerYear !== null) {
      message.blocksPerYear = object.blocksPerYear as Long;
    } else {
      message.blocksPerYear = Long.UZERO;
    }
    if (object.startHeight !== undefined && object.startHeight !== null) {
      message.startHeight = object.startHeight as Long;
    } else {
      message.startHeight = Long.ZERO;
    }
    if (object.inflation !== undefined && object.inflation !== null) {
      message.inflation = object.inflation;
    } else {
      message.inflation = "";
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
