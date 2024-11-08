/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "aioz.mint.v1";
export interface Allocation {
  /** address is the bech32-encoded address of the allocation. */
  address: string;
  /** rate is the rate of the allocation. */
  rate: string;
}
/** Params defines the parameters for the x/mint module. */
export interface Params {
  /** type of coin to mint. */
  mintDenom: string;
  /** expected blocks per year. */
  blocksPerYear: bigint;
  /** expected start minting block height. */
  startHeight: bigint;
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
  typeUrl: "/aioz.mint.v1.Allocation",
  encode(message: Allocation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.rate !== "") {
      writer.uint32(18).string(message.rate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Allocation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
    const obj = createBaseAllocation();
    if (isSet(object.address)) obj.address = String(object.address);
    if (isSet(object.rate)) obj.rate = String(object.rate);
    return obj;
  },
  toJSON(message: Allocation): JsonSafe<Allocation> {
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
    blocksPerYear: BigInt(0),
    startHeight: BigInt(0),
    inflation: "",
    additionalAllocations: [],
  };
}
export const Params = {
  typeUrl: "/aioz.mint.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.mintDenom !== "") {
      writer.uint32(10).string(message.mintDenom);
    }
    if (message.blocksPerYear !== BigInt(0)) {
      writer.uint32(16).uint64(message.blocksPerYear);
    }
    if (message.startHeight !== BigInt(0)) {
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
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mintDenom = reader.string();
          break;
        case 2:
          message.blocksPerYear = reader.uint64();
          break;
        case 3:
          message.startHeight = reader.int64();
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
    const obj = createBaseParams();
    if (isSet(object.mintDenom)) obj.mintDenom = String(object.mintDenom);
    if (isSet(object.blocksPerYear)) obj.blocksPerYear = BigInt(object.blocksPerYear.toString());
    if (isSet(object.startHeight)) obj.startHeight = BigInt(object.startHeight.toString());
    if (isSet(object.inflation)) obj.inflation = String(object.inflation);
    if (Array.isArray(object?.additionalAllocations))
      obj.additionalAllocations = object.additionalAllocations.map((e: any) => Allocation.fromJSON(e));
    return obj;
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    message.mintDenom !== undefined && (obj.mintDenom = message.mintDenom);
    message.blocksPerYear !== undefined &&
      (obj.blocksPerYear = (message.blocksPerYear || BigInt(0)).toString());
    message.startHeight !== undefined && (obj.startHeight = (message.startHeight || BigInt(0)).toString());
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
    if (object.blocksPerYear !== undefined && object.blocksPerYear !== null) {
      message.blocksPerYear = BigInt(object.blocksPerYear.toString());
    }
    if (object.startHeight !== undefined && object.startHeight !== null) {
      message.startHeight = BigInt(object.startHeight.toString());
    }
    message.inflation = object.inflation ?? "";
    message.additionalAllocations = object.additionalAllocations?.map((e) => Allocation.fromPartial(e)) || [];
    return message;
  },
};
