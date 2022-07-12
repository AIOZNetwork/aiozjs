/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { TokenPair } from "../../../aioz/aiozrc20/v1/aiozrc20";

export const protobufPackage = "aioz.aiozrc20.v1";

/** GenesisState defines the module's genesis state. */
export interface GenesisState {
  /** module parameters */
  params?: Params;
  /** registered token pairs */
  tokenPairs: TokenPair[];
}

/** Params defines the aiozrc20 module params */
export interface Params {
  /** parameter to enable the conversion of Cosmos coins <--> AIOZRC20 tokens. */
  enabled: boolean;
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tokenPairs) {
      TokenPair.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.tokenPairs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.tokenPairs.push(TokenPair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.tokenPairs = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.tokenPairs !== undefined && object.tokenPairs !== null) {
      for (const e of object.tokenPairs) {
        message.tokenPairs.push(TokenPair.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.tokenPairs) {
      obj.tokenPairs = message.tokenPairs.map((e) => (e ? TokenPair.toJSON(e) : undefined));
    } else {
      obj.tokenPairs = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.tokenPairs = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.tokenPairs !== undefined && object.tokenPairs !== null) {
      for (const e of object.tokenPairs) {
        message.tokenPairs.push(TokenPair.fromPartial(e));
      }
    }
    return message;
  },
};

const baseParams: object = { enabled: false };

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
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
          message.enabled = reader.bool();
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
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = Boolean(object.enabled);
    } else {
      message.enabled = false;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.enabled !== undefined && (obj.enabled = message.enabled);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    } else {
      message.enabled = false;
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
