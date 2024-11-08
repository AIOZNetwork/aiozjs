/* eslint-disable */
import { TokenPair } from "./aiozrc20";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "aioz.aiozrc20.v1";
/** GenesisState defines the module's genesis state. */
export interface GenesisState {
  /** module parameters */
  params: Params;
  /** registered token pairs */
  tokenPairs: TokenPair[];
  /** converter address */
  converterAddress: string;
}
/** Params defines the aiozrc20 module params. */
export interface Params {
  /** parameter to enable the conversion of Cosmos coins <--> AIOZRC20 tokens. */
  enabled: boolean;
  /**
   * parameter to enable the EVM hook that converts an AIOZRC20 token to a
   * Cosmos Coin by transferring the Tokens through a MsgEthereumTx to the
   * ModuleAddress Ethereum address.
   */
  evmHookEnabled: boolean;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    tokenPairs: [],
    converterAddress: "",
  };
}
export const GenesisState = {
  typeUrl: "/aioz.aiozrc20.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tokenPairs) {
      TokenPair.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.converterAddress !== "") {
      writer.uint32(26).string(message.converterAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.tokenPairs.push(TokenPair.decode(reader, reader.uint32()));
          break;
        case 3:
          message.converterAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GenesisState {
    const obj = createBaseGenesisState();
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    if (Array.isArray(object?.tokenPairs))
      obj.tokenPairs = object.tokenPairs.map((e: any) => TokenPair.fromJSON(e));
    if (isSet(object.converterAddress)) obj.converterAddress = String(object.converterAddress);
    return obj;
  },
  toJSON(message: GenesisState): JsonSafe<GenesisState> {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.tokenPairs) {
      obj.tokenPairs = message.tokenPairs.map((e) => (e ? TokenPair.toJSON(e) : undefined));
    } else {
      obj.tokenPairs = [];
    }
    message.converterAddress !== undefined && (obj.converterAddress = message.converterAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    message.tokenPairs = object.tokenPairs?.map((e) => TokenPair.fromPartial(e)) || [];
    message.converterAddress = object.converterAddress ?? "";
    return message;
  },
};
function createBaseParams(): Params {
  return {
    enabled: false,
    evmHookEnabled: false,
  };
}
export const Params = {
  typeUrl: "/aioz.aiozrc20.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    if (message.evmHookEnabled === true) {
      writer.uint32(16).bool(message.evmHookEnabled);
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
          message.enabled = reader.bool();
          break;
        case 2:
          message.evmHookEnabled = reader.bool();
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
    if (isSet(object.enabled)) obj.enabled = Boolean(object.enabled);
    if (isSet(object.evmHookEnabled)) obj.evmHookEnabled = Boolean(object.evmHookEnabled);
    return obj;
  },
  toJSON(message: Params): JsonSafe<Params> {
    const obj: any = {};
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.evmHookEnabled !== undefined && (obj.evmHookEnabled = message.evmHookEnabled);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.enabled = object.enabled ?? false;
    message.evmHookEnabled = object.evmHookEnabled ?? false;
    return message;
  },
};
