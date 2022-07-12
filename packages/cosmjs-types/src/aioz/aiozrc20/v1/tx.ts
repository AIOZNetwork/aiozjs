/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "aioz.aiozrc20.v1";

/** MsgConvertCoin defines a Msg to convert a Cosmos Coin to a AIOZRC20 token */
export interface MsgConvertCoin {
  /**
   * Cosmos coin which denomination is registered on aiozrc20 bridge.
   * The coin amount defines the total AIOZRC20 tokens to convert.
   */
  coin?: Coin;
  /** recipient hex address to receive AIOZRC20 token */
  receiver: string;
  /** cosmos bech32 address from the owner of the given AIOZRC20 tokens */
  sender: string;
}

/** MsgConvertCoinResponse returns no fields */
export interface MsgConvertCoinResponse {}

/** MsgConvertAIOZRC20 defines a Msg to convert an AIOZRC20 token to a Cosmos SDK coin. */
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

/** MsgConvertAIOZRC20Response returns no fields */
export interface MsgConvertAIOZRC20Response {}

const baseMsgConvertCoin: object = { receiver: "", sender: "" };

export const MsgConvertCoin = {
  encode(message: MsgConvertCoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConvertCoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgConvertCoin } as MsgConvertCoin;
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
    const message = { ...baseMsgConvertCoin } as MsgConvertCoin;
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromJSON(object.coin);
    } else {
      message.coin = undefined;
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = String(object.receiver);
    } else {
      message.receiver = "";
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    return message;
  },

  toJSON(message: MsgConvertCoin): unknown {
    const obj: any = {};
    message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgConvertCoin>): MsgConvertCoin {
    const message = { ...baseMsgConvertCoin } as MsgConvertCoin;
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromPartial(object.coin);
    } else {
      message.coin = undefined;
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    } else {
      message.receiver = "";
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    return message;
  },
};

const baseMsgConvertCoinResponse: object = {};

export const MsgConvertCoinResponse = {
  encode(_: MsgConvertCoinResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConvertCoinResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgConvertCoinResponse } as MsgConvertCoinResponse;
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
    const message = { ...baseMsgConvertCoinResponse } as MsgConvertCoinResponse;
    return message;
  },

  toJSON(_: MsgConvertCoinResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgConvertCoinResponse>): MsgConvertCoinResponse {
    const message = { ...baseMsgConvertCoinResponse } as MsgConvertCoinResponse;
    return message;
  },
};

const baseMsgConvertAIOZRC20: object = { contractAddress: "", amount: "", receiver: "", sender: "" };

export const MsgConvertAIOZRC20 = {
  encode(message: MsgConvertAIOZRC20, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConvertAIOZRC20 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgConvertAIOZRC20 } as MsgConvertAIOZRC20;
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
    const message = { ...baseMsgConvertAIOZRC20 } as MsgConvertAIOZRC20;
    if (object.contractAddress !== undefined && object.contractAddress !== null) {
      message.contractAddress = String(object.contractAddress);
    } else {
      message.contractAddress = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = String(object.amount);
    } else {
      message.amount = "";
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = String(object.receiver);
    } else {
      message.receiver = "";
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    return message;
  },

  toJSON(message: MsgConvertAIOZRC20): unknown {
    const obj: any = {};
    message.contractAddress !== undefined && (obj.contractAddress = message.contractAddress);
    message.amount !== undefined && (obj.amount = message.amount);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgConvertAIOZRC20>): MsgConvertAIOZRC20 {
    const message = { ...baseMsgConvertAIOZRC20 } as MsgConvertAIOZRC20;
    if (object.contractAddress !== undefined && object.contractAddress !== null) {
      message.contractAddress = object.contractAddress;
    } else {
      message.contractAddress = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    } else {
      message.amount = "";
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    } else {
      message.receiver = "";
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    return message;
  },
};

const baseMsgConvertAIOZRC20Response: object = {};

export const MsgConvertAIOZRC20Response = {
  encode(_: MsgConvertAIOZRC20Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConvertAIOZRC20Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgConvertAIOZRC20Response } as MsgConvertAIOZRC20Response;
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
    const message = { ...baseMsgConvertAIOZRC20Response } as MsgConvertAIOZRC20Response;
    return message;
  },

  toJSON(_: MsgConvertAIOZRC20Response): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgConvertAIOZRC20Response>): MsgConvertAIOZRC20Response {
    const message = { ...baseMsgConvertAIOZRC20Response } as MsgConvertAIOZRC20Response;
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
   * ConvertAIOZRC20 mints a Cosmos coin representation of the AIOZRC20 token contract
   * that is registered on the token mapping.
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
    return promise.then((data) => MsgConvertCoinResponse.decode(new _m0.Reader(data)));
  }

  ConvertAIOZRC20(request: MsgConvertAIOZRC20): Promise<MsgConvertAIOZRC20Response> {
    const data = MsgConvertAIOZRC20.encode(request).finish();
    const promise = this.rpc.request("aioz.aiozrc20.v1.Msg", "ConvertAIOZRC20", data);
    return promise.then((data) => MsgConvertAIOZRC20Response.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
