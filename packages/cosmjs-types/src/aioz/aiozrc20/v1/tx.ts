/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, Rpc } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "aioz.aiozrc20.v1";
/** MsgConvertCoin defines a Msg to convert a Cosmos Coin to a AIOZRC20 token. */
export interface MsgConvertCoin {
  /**
   * Cosmos coin which denomination is registered on aiozrc20 bridge.
   * The coin amount defines the total AIOZRC20 tokens to convert.
   */
  coin: Coin;
  /** recipient hex address to receive AIOZRC20 token */
  receiver: string;
  /** cosmos bech32 address from the owner of the given AIOZRC20 tokens */
  sender: string;
}
/** MsgConvertCoinResponse returns no fields. */
export interface MsgConvertCoinResponse {}
/**
 * MsgConvertAIOZRC20 defines a Msg to convert an AIOZRC20 token to a Cosmos SDK
 * coin.
 */
export interface MsgConvertAIOZRC20 {
  /** AIOZRC20 token contract address registered on aiozrc20 bridge */
  contractAddress: string;
  /** amount of AIOZRC20 tokens to mint */
  amount: string;
  /** bech32 address to receive SDK coins. */
  receiver: string;
  /** sender hex address from the owner of the given AIOZRC20 tokens */
  sender: string;
}
/** MsgConvertAIOZRC20Response returns no fields. */
export interface MsgConvertAIOZRC20Response {}
function createBaseMsgConvertCoin(): MsgConvertCoin {
  return {
    coin: Coin.fromPartial({}),
    receiver: "",
    sender: "",
  };
}
export const MsgConvertCoin = {
  typeUrl: "/aioz.aiozrc20.v1.MsgConvertCoin",
  encode(message: MsgConvertCoin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(10).fork()).ldelim();
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConvertCoin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertCoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coin = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgConvertCoin {
    const obj = createBaseMsgConvertCoin();
    if (isSet(object.coin)) obj.coin = Coin.fromJSON(object.coin);
    if (isSet(object.receiver)) obj.receiver = String(object.receiver);
    if (isSet(object.sender)) obj.sender = String(object.sender);
    return obj;
  },
  toJSON(message: MsgConvertCoin): JsonSafe<MsgConvertCoin> {
    const obj: any = {};
    message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgConvertCoin>, I>>(object: I): MsgConvertCoin {
    const message = createBaseMsgConvertCoin();
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromPartial(object.coin);
    }
    message.receiver = object.receiver ?? "";
    message.sender = object.sender ?? "";
    return message;
  },
};
function createBaseMsgConvertCoinResponse(): MsgConvertCoinResponse {
  return {};
}
export const MsgConvertCoinResponse = {
  typeUrl: "/aioz.aiozrc20.v1.MsgConvertCoinResponse",
  encode(_: MsgConvertCoinResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConvertCoinResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertCoinResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgConvertCoinResponse {
    const obj = createBaseMsgConvertCoinResponse();
    return obj;
  },
  toJSON(_: MsgConvertCoinResponse): JsonSafe<MsgConvertCoinResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgConvertCoinResponse>, I>>(_: I): MsgConvertCoinResponse {
    const message = createBaseMsgConvertCoinResponse();
    return message;
  },
};
function createBaseMsgConvertAIOZRC20(): MsgConvertAIOZRC20 {
  return {
    contractAddress: "",
    amount: "",
    receiver: "",
    sender: "",
  };
}
export const MsgConvertAIOZRC20 = {
  typeUrl: "/aioz.aiozrc20.v1.MsgConvertAIOZRC20",
  encode(message: MsgConvertAIOZRC20, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.receiver !== "") {
      writer.uint32(26).string(message.receiver);
    }
    if (message.sender !== "") {
      writer.uint32(34).string(message.sender);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConvertAIOZRC20 {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertAIOZRC20();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.receiver = reader.string();
          break;
        case 4:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgConvertAIOZRC20 {
    const obj = createBaseMsgConvertAIOZRC20();
    if (isSet(object.contractAddress)) obj.contractAddress = String(object.contractAddress);
    if (isSet(object.amount)) obj.amount = String(object.amount);
    if (isSet(object.receiver)) obj.receiver = String(object.receiver);
    if (isSet(object.sender)) obj.sender = String(object.sender);
    return obj;
  },
  toJSON(message: MsgConvertAIOZRC20): JsonSafe<MsgConvertAIOZRC20> {
    const obj: any = {};
    message.contractAddress !== undefined && (obj.contractAddress = message.contractAddress);
    message.amount !== undefined && (obj.amount = message.amount);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgConvertAIOZRC20>, I>>(object: I): MsgConvertAIOZRC20 {
    const message = createBaseMsgConvertAIOZRC20();
    message.contractAddress = object.contractAddress ?? "";
    message.amount = object.amount ?? "";
    message.receiver = object.receiver ?? "";
    message.sender = object.sender ?? "";
    return message;
  },
};
function createBaseMsgConvertAIOZRC20Response(): MsgConvertAIOZRC20Response {
  return {};
}
export const MsgConvertAIOZRC20Response = {
  typeUrl: "/aioz.aiozrc20.v1.MsgConvertAIOZRC20Response",
  encode(_: MsgConvertAIOZRC20Response, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConvertAIOZRC20Response {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertAIOZRC20Response();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgConvertAIOZRC20Response {
    const obj = createBaseMsgConvertAIOZRC20Response();
    return obj;
  },
  toJSON(_: MsgConvertAIOZRC20Response): JsonSafe<MsgConvertAIOZRC20Response> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgConvertAIOZRC20Response>, I>>(_: I): MsgConvertAIOZRC20Response {
    const message = createBaseMsgConvertAIOZRC20Response();
    return message;
  },
};
/** Msg defines the aiozrc20 Msg service. */
export interface Msg {
  /**
   * ConvertCoin mints a AIOZRC20 representation of the SDK Coin denom that is
   * registered on the token mapping.
   */
  ConvertCoin(request: MsgConvertCoin): Promise<MsgConvertCoinResponse>;
  /**
   * ConvertAIOZRC20 mints a Cosmos coin representation of the AIOZRC20 token
   * contract that is registered on the token mapping.
   */
  ConvertAIOZRC20(request: MsgConvertAIOZRC20): Promise<MsgConvertAIOZRC20Response>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ConvertCoin = this.ConvertCoin.bind(this);
    this.ConvertAIOZRC20 = this.ConvertAIOZRC20.bind(this);
  }
  ConvertCoin(request: MsgConvertCoin): Promise<MsgConvertCoinResponse> {
    const data = MsgConvertCoin.encode(request).finish();
    const promise = this.rpc.request("aioz.aiozrc20.v1.Msg", "ConvertCoin", data);
    return promise.then((data) => MsgConvertCoinResponse.decode(new BinaryReader(data)));
  }
  ConvertAIOZRC20(request: MsgConvertAIOZRC20): Promise<MsgConvertAIOZRC20Response> {
    const data = MsgConvertAIOZRC20.encode(request).finish();
    const promise = this.rpc.request("aioz.aiozrc20.v1.Msg", "ConvertAIOZRC20", data);
    return promise.then((data) => MsgConvertAIOZRC20Response.decode(new BinaryReader(data)));
  }
}
