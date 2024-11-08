/* eslint-disable */
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "ethermint.feemarket.v1";
/** EventFeeMarket is the event type for the fee market module */
export interface EventFeeMarket {
  /** base_fee for EIP-1559 blocks */
  baseFee: string;
}
/** EventBlockGas defines an Ethereum block gas event */
export interface EventBlockGas {
  /** height of the block */
  height: string;
  /** amount of gas wanted by the block */
  amount: string;
}
function createBaseEventFeeMarket(): EventFeeMarket {
  return {
    baseFee: "",
  };
}
export const EventFeeMarket = {
  typeUrl: "/ethermint.feemarket.v1.EventFeeMarket",
  encode(message: EventFeeMarket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.baseFee !== "") {
      writer.uint32(10).string(message.baseFee);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventFeeMarket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventFeeMarket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseFee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventFeeMarket {
    const obj = createBaseEventFeeMarket();
    if (isSet(object.baseFee)) obj.baseFee = String(object.baseFee);
    return obj;
  },
  toJSON(message: EventFeeMarket): JsonSafe<EventFeeMarket> {
    const obj: any = {};
    message.baseFee !== undefined && (obj.baseFee = message.baseFee);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventFeeMarket>, I>>(object: I): EventFeeMarket {
    const message = createBaseEventFeeMarket();
    message.baseFee = object.baseFee ?? "";
    return message;
  },
};
function createBaseEventBlockGas(): EventBlockGas {
  return {
    height: "",
    amount: "",
  };
}
export const EventBlockGas = {
  typeUrl: "/ethermint.feemarket.v1.EventBlockGas",
  encode(message: EventBlockGas, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== "") {
      writer.uint32(10).string(message.height);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventBlockGas {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBlockGas();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EventBlockGas {
    const obj = createBaseEventBlockGas();
    if (isSet(object.height)) obj.height = String(object.height);
    if (isSet(object.amount)) obj.amount = String(object.amount);
    return obj;
  },
  toJSON(message: EventBlockGas): JsonSafe<EventBlockGas> {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<EventBlockGas>, I>>(object: I): EventBlockGas {
    const message = createBaseEventBlockGas();
    message.height = object.height ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
};
