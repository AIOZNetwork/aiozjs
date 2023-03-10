/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact, Long } from "../../../helpers";
export const protobufPackage = "aioz.mint.v1";
export interface Allocation {
  /** address is the bech32-encoded address of the allocation. */
  address: string;
  /** rate is the rate of the allocation. */

  rate: string;
}
/** Params holds parameters for the mint module. */

export interface Params {
  /** type of coin to mint. */
  mintDenom: string;
  /** expected blocks per year. */

  blocksPerYear: Long;
  /** expected start minting block height. */

  startHeight: Long;
  /** current block inflation rate. */

  inflation: string;
  /** list of additional allocations for minting. */

  additionalAllocations: Allocation[];
}

function createBaseAllocation(): Allocation {
  return {
    address: "",
    rate: "",
  };
}

export const Allocation = {
  encode(message: Allocation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }

    if (message.rate !== "") {
      writer.uint32(18).string(message.rate);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Allocation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllocation();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;

        case 2:
          message.rate = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): Allocation {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      rate: isSet(object.rate) ? String(object.rate) : "",
    };
  },

  toJSON(message: Allocation): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.rate !== undefined && (obj.rate = message.rate);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Allocation>, I>>(object: I): Allocation {
    const message = createBaseAllocation();
    message.address = object.address ?? "";
    message.rate = object.rate ?? "";
    return message;
  },
};

function createBaseParams(): Params {
  return {
    mintDenom: "",
    blocksPerYear: Long.UZERO,
    startHeight: Long.ZERO,
    inflation: "",
    additionalAllocations: [],
  };
}

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

    for (const v of message.additionalAllocations) {
      Allocation.encode(v!, writer.uint32(42).fork()).ldelim();
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

        case 5:
          message.additionalAllocations.push(Allocation.decode(reader, reader.uint32()));
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
      mintDenom: isSet(object.mintDenom) ? String(object.mintDenom) : "",
      blocksPerYear: isSet(object.blocksPerYear) ? Long.fromValue(object.blocksPerYear) : Long.UZERO,
      startHeight: isSet(object.startHeight) ? Long.fromValue(object.startHeight) : Long.ZERO,
      inflation: isSet(object.inflation) ? String(object.inflation) : "",
      additionalAllocations: Array.isArray(object?.additionalAllocations)
        ? object.additionalAllocations.map((e: any) => Allocation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.mintDenom !== undefined && (obj.mintDenom = message.mintDenom);
    message.blocksPerYear !== undefined &&
      (obj.blocksPerYear = (message.blocksPerYear || Long.UZERO).toString());
    message.startHeight !== undefined && (obj.startHeight = (message.startHeight || Long.ZERO).toString());
    message.inflation !== undefined && (obj.inflation = message.inflation);

    if (message.additionalAllocations) {
      obj.additionalAllocations = message.additionalAllocations.map((e) =>
        e ? Allocation.toJSON(e) : undefined,
      );
    } else {
      obj.additionalAllocations = [];
    }

    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.mintDenom = object.mintDenom ?? "";
    message.blocksPerYear =
      object.blocksPerYear !== undefined && object.blocksPerYear !== null
        ? Long.fromValue(object.blocksPerYear)
        : Long.UZERO;
    message.startHeight =
      object.startHeight !== undefined && object.startHeight !== null
        ? Long.fromValue(object.startHeight)
        : Long.ZERO;
    message.inflation = object.inflation ?? "";
    message.additionalAllocations = object.additionalAllocations?.map((e) => Allocation.fromPartial(e)) || [];
    return message;
  },
};
