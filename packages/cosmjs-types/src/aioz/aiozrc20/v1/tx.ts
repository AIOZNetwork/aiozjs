/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params, Metadata } from "../../../cosmos/bank/v1beta1/bank";
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
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/aiozrc20 parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {}
/** MsgRegisterCoin is to register a token pair. */
export interface MsgRegisterCoin {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** token pair of Cosmos native denom and AIOZRC20 token address */
  metadata: Metadata;
}
/**
 * MsgRegisterCoinResponse defines the response structure for executing a
 * MsgRegisterCoin message.
 */
export interface MsgRegisterCoinResponse {}
/** MsgRegisterCoin is to register a token pair. */
export interface MsgRegisterAIOZRC20 {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** contract address of AIOZRC20 token */
  aiozrc20Address: string;
}
/**
 * MsgRegisterAIOZRC20Response defines the response structure for executing a
 * MsgRegisterAIOZRC20 message.
 */
export interface MsgRegisterAIOZRC20Response {}
/** MsgToggleTokenPairConversion is to toggle the conversion of a token pair's AIOZRC20. */
export interface MsgToggleTokenPairConversion {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * token identifier can be either the hex contract address of the AIOZRC20 or
   * the Cosmos base denomination
   */
  token: string;
}
/**
 * MsgToggleTokenPairConversionResponse defines the response structure for executing a
 * MsgToggleTokenPairConversion message.
 */
export interface MsgToggleTokenPairConversionResponse {}
/** MsgUpdateTokenPair is to update a token pair's AIOZRC20 contract address. */
export interface MsgUpdateTokenPair {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** contract address of AIOZRC20 token */
  aiozrc20Address: string;
  /** new address of AIOZRC20 token contract */
  newAiozrc20Address: string;
}
/**
 * MsgUpdateTokenPairResponse defines the response structure for executing a
 * MsgUpdateTokenPair message.
 */
export interface MsgUpdateTokenPairResponse {}
/** MsgSetConverterAddress is to set/update the converter address. */
export interface MsgSetConverterAddress {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** implementation contract address of the converter, let empty to deploy a default one */
  upgradeAddress: string;
}
/**
 * MsgSetConverterAddressResponse defines the response structure for executing a
 * MsgSetConverterAddress message.
 */
export interface MsgSetConverterAddressResponse {}
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
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({}),
  };
}
export const MsgUpdateParams = {
  typeUrl: "/aioz.aiozrc20.v1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateParams {
    const obj = createBaseMsgUpdateParams();
    if (isSet(object.authority)) obj.authority = String(object.authority);
    if (isSet(object.params)) obj.params = Params.fromJSON(object.params);
    return obj;
  },
  toJSON(message: MsgUpdateParams): JsonSafe<MsgUpdateParams> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    }
    return message;
  },
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/aioz.aiozrc20.v1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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
  fromJSON(_: any): MsgUpdateParamsResponse {
    const obj = createBaseMsgUpdateParamsResponse();
    return obj;
  },
  toJSON(_: MsgUpdateParamsResponse): JsonSafe<MsgUpdateParamsResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};
function createBaseMsgRegisterCoin(): MsgRegisterCoin {
  return {
    authority: "",
    metadata: Metadata.fromPartial({}),
  };
}
export const MsgRegisterCoin = {
  typeUrl: "/aioz.aiozrc20.v1.MsgRegisterCoin",
  encode(message: MsgRegisterCoin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRegisterCoin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterCoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRegisterCoin {
    const obj = createBaseMsgRegisterCoin();
    if (isSet(object.authority)) obj.authority = String(object.authority);
    if (isSet(object.metadata)) obj.metadata = Metadata.fromJSON(object.metadata);
    return obj;
  },
  toJSON(message: MsgRegisterCoin): JsonSafe<MsgRegisterCoin> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata ? Metadata.toJSON(message.metadata) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterCoin>, I>>(object: I): MsgRegisterCoin {
    const message = createBaseMsgRegisterCoin();
    message.authority = object.authority ?? "";
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = Metadata.fromPartial(object.metadata);
    }
    return message;
  },
};
function createBaseMsgRegisterCoinResponse(): MsgRegisterCoinResponse {
  return {};
}
export const MsgRegisterCoinResponse = {
  typeUrl: "/aioz.aiozrc20.v1.MsgRegisterCoinResponse",
  encode(_: MsgRegisterCoinResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRegisterCoinResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterCoinResponse();
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
  fromJSON(_: any): MsgRegisterCoinResponse {
    const obj = createBaseMsgRegisterCoinResponse();
    return obj;
  },
  toJSON(_: MsgRegisterCoinResponse): JsonSafe<MsgRegisterCoinResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterCoinResponse>, I>>(_: I): MsgRegisterCoinResponse {
    const message = createBaseMsgRegisterCoinResponse();
    return message;
  },
};
function createBaseMsgRegisterAIOZRC20(): MsgRegisterAIOZRC20 {
  return {
    authority: "",
    aiozrc20Address: "",
  };
}
export const MsgRegisterAIOZRC20 = {
  typeUrl: "/aioz.aiozrc20.v1.MsgRegisterAIOZRC20",
  encode(message: MsgRegisterAIOZRC20, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.aiozrc20Address !== "") {
      writer.uint32(18).string(message.aiozrc20Address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRegisterAIOZRC20 {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterAIOZRC20();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.aiozrc20Address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRegisterAIOZRC20 {
    const obj = createBaseMsgRegisterAIOZRC20();
    if (isSet(object.authority)) obj.authority = String(object.authority);
    if (isSet(object.aiozrc20Address)) obj.aiozrc20Address = String(object.aiozrc20Address);
    return obj;
  },
  toJSON(message: MsgRegisterAIOZRC20): JsonSafe<MsgRegisterAIOZRC20> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.aiozrc20Address !== undefined && (obj.aiozrc20Address = message.aiozrc20Address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterAIOZRC20>, I>>(object: I): MsgRegisterAIOZRC20 {
    const message = createBaseMsgRegisterAIOZRC20();
    message.authority = object.authority ?? "";
    message.aiozrc20Address = object.aiozrc20Address ?? "";
    return message;
  },
};
function createBaseMsgRegisterAIOZRC20Response(): MsgRegisterAIOZRC20Response {
  return {};
}
export const MsgRegisterAIOZRC20Response = {
  typeUrl: "/aioz.aiozrc20.v1.MsgRegisterAIOZRC20Response",
  encode(_: MsgRegisterAIOZRC20Response, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRegisterAIOZRC20Response {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterAIOZRC20Response();
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
  fromJSON(_: any): MsgRegisterAIOZRC20Response {
    const obj = createBaseMsgRegisterAIOZRC20Response();
    return obj;
  },
  toJSON(_: MsgRegisterAIOZRC20Response): JsonSafe<MsgRegisterAIOZRC20Response> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgRegisterAIOZRC20Response>, I>>(
    _: I,
  ): MsgRegisterAIOZRC20Response {
    const message = createBaseMsgRegisterAIOZRC20Response();
    return message;
  },
};
function createBaseMsgToggleTokenPairConversion(): MsgToggleTokenPairConversion {
  return {
    authority: "",
    token: "",
  };
}
export const MsgToggleTokenPairConversion = {
  typeUrl: "/aioz.aiozrc20.v1.MsgToggleTokenPairConversion",
  encode(message: MsgToggleTokenPairConversion, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgToggleTokenPairConversion {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleTokenPairConversion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgToggleTokenPairConversion {
    const obj = createBaseMsgToggleTokenPairConversion();
    if (isSet(object.authority)) obj.authority = String(object.authority);
    if (isSet(object.token)) obj.token = String(object.token);
    return obj;
  },
  toJSON(message: MsgToggleTokenPairConversion): JsonSafe<MsgToggleTokenPairConversion> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgToggleTokenPairConversion>, I>>(
    object: I,
  ): MsgToggleTokenPairConversion {
    const message = createBaseMsgToggleTokenPairConversion();
    message.authority = object.authority ?? "";
    message.token = object.token ?? "";
    return message;
  },
};
function createBaseMsgToggleTokenPairConversionResponse(): MsgToggleTokenPairConversionResponse {
  return {};
}
export const MsgToggleTokenPairConversionResponse = {
  typeUrl: "/aioz.aiozrc20.v1.MsgToggleTokenPairConversionResponse",
  encode(
    _: MsgToggleTokenPairConversionResponse,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgToggleTokenPairConversionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleTokenPairConversionResponse();
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
  fromJSON(_: any): MsgToggleTokenPairConversionResponse {
    const obj = createBaseMsgToggleTokenPairConversionResponse();
    return obj;
  },
  toJSON(_: MsgToggleTokenPairConversionResponse): JsonSafe<MsgToggleTokenPairConversionResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgToggleTokenPairConversionResponse>, I>>(
    _: I,
  ): MsgToggleTokenPairConversionResponse {
    const message = createBaseMsgToggleTokenPairConversionResponse();
    return message;
  },
};
function createBaseMsgUpdateTokenPair(): MsgUpdateTokenPair {
  return {
    authority: "",
    aiozrc20Address: "",
    newAiozrc20Address: "",
  };
}
export const MsgUpdateTokenPair = {
  typeUrl: "/aioz.aiozrc20.v1.MsgUpdateTokenPair",
  encode(message: MsgUpdateTokenPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.aiozrc20Address !== "") {
      writer.uint32(18).string(message.aiozrc20Address);
    }
    if (message.newAiozrc20Address !== "") {
      writer.uint32(26).string(message.newAiozrc20Address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateTokenPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTokenPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.aiozrc20Address = reader.string();
          break;
        case 3:
          message.newAiozrc20Address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateTokenPair {
    const obj = createBaseMsgUpdateTokenPair();
    if (isSet(object.authority)) obj.authority = String(object.authority);
    if (isSet(object.aiozrc20Address)) obj.aiozrc20Address = String(object.aiozrc20Address);
    if (isSet(object.newAiozrc20Address)) obj.newAiozrc20Address = String(object.newAiozrc20Address);
    return obj;
  },
  toJSON(message: MsgUpdateTokenPair): JsonSafe<MsgUpdateTokenPair> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.aiozrc20Address !== undefined && (obj.aiozrc20Address = message.aiozrc20Address);
    message.newAiozrc20Address !== undefined && (obj.newAiozrc20Address = message.newAiozrc20Address);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateTokenPair>, I>>(object: I): MsgUpdateTokenPair {
    const message = createBaseMsgUpdateTokenPair();
    message.authority = object.authority ?? "";
    message.aiozrc20Address = object.aiozrc20Address ?? "";
    message.newAiozrc20Address = object.newAiozrc20Address ?? "";
    return message;
  },
};
function createBaseMsgUpdateTokenPairResponse(): MsgUpdateTokenPairResponse {
  return {};
}
export const MsgUpdateTokenPairResponse = {
  typeUrl: "/aioz.aiozrc20.v1.MsgUpdateTokenPairResponse",
  encode(_: MsgUpdateTokenPairResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateTokenPairResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTokenPairResponse();
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
  fromJSON(_: any): MsgUpdateTokenPairResponse {
    const obj = createBaseMsgUpdateTokenPairResponse();
    return obj;
  },
  toJSON(_: MsgUpdateTokenPairResponse): JsonSafe<MsgUpdateTokenPairResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateTokenPairResponse>, I>>(_: I): MsgUpdateTokenPairResponse {
    const message = createBaseMsgUpdateTokenPairResponse();
    return message;
  },
};
function createBaseMsgSetConverterAddress(): MsgSetConverterAddress {
  return {
    authority: "",
    upgradeAddress: "",
  };
}
export const MsgSetConverterAddress = {
  typeUrl: "/aioz.aiozrc20.v1.MsgSetConverterAddress",
  encode(message: MsgSetConverterAddress, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.upgradeAddress !== "") {
      writer.uint32(18).string(message.upgradeAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSetConverterAddress {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetConverterAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.upgradeAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSetConverterAddress {
    const obj = createBaseMsgSetConverterAddress();
    if (isSet(object.authority)) obj.authority = String(object.authority);
    if (isSet(object.upgradeAddress)) obj.upgradeAddress = String(object.upgradeAddress);
    return obj;
  },
  toJSON(message: MsgSetConverterAddress): JsonSafe<MsgSetConverterAddress> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.upgradeAddress !== undefined && (obj.upgradeAddress = message.upgradeAddress);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetConverterAddress>, I>>(object: I): MsgSetConverterAddress {
    const message = createBaseMsgSetConverterAddress();
    message.authority = object.authority ?? "";
    message.upgradeAddress = object.upgradeAddress ?? "";
    return message;
  },
};
function createBaseMsgSetConverterAddressResponse(): MsgSetConverterAddressResponse {
  return {};
}
export const MsgSetConverterAddressResponse = {
  typeUrl: "/aioz.aiozrc20.v1.MsgSetConverterAddressResponse",
  encode(_: MsgSetConverterAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSetConverterAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetConverterAddressResponse();
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
  fromJSON(_: any): MsgSetConverterAddressResponse {
    const obj = createBaseMsgSetConverterAddressResponse();
    return obj;
  },
  toJSON(_: MsgSetConverterAddressResponse): JsonSafe<MsgSetConverterAddressResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgSetConverterAddressResponse>, I>>(
    _: I,
  ): MsgSetConverterAddressResponse {
    const message = createBaseMsgSetConverterAddressResponse();
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
  /**
   * UpdateParams defines a governance operation for updating the x/aiozrc20 module
   * parameters. The authority is defaults to the x/gov module account.
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  RegisterCoin(request: MsgRegisterCoin): Promise<MsgRegisterCoinResponse>;
  RegisterAIOZRC20(request: MsgRegisterAIOZRC20): Promise<MsgRegisterAIOZRC20Response>;
  ToggleTokenPairConversion(
    request: MsgToggleTokenPairConversion,
  ): Promise<MsgToggleTokenPairConversionResponse>;
  UpdateTokenPair(request: MsgUpdateTokenPair): Promise<MsgUpdateTokenPairResponse>;
  SetConverterAddress(request: MsgSetConverterAddress): Promise<MsgSetConverterAddressResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ConvertCoin = this.ConvertCoin.bind(this);
    this.ConvertAIOZRC20 = this.ConvertAIOZRC20.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
    this.RegisterCoin = this.RegisterCoin.bind(this);
    this.RegisterAIOZRC20 = this.RegisterAIOZRC20.bind(this);
    this.ToggleTokenPairConversion = this.ToggleTokenPairConversion.bind(this);
    this.UpdateTokenPair = this.UpdateTokenPair.bind(this);
    this.SetConverterAddress = this.SetConverterAddress.bind(this);
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
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("aioz.aiozrc20.v1.Msg", "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  RegisterCoin(request: MsgRegisterCoin): Promise<MsgRegisterCoinResponse> {
    const data = MsgRegisterCoin.encode(request).finish();
    const promise = this.rpc.request("aioz.aiozrc20.v1.Msg", "RegisterCoin", data);
    return promise.then((data) => MsgRegisterCoinResponse.decode(new BinaryReader(data)));
  }
  RegisterAIOZRC20(request: MsgRegisterAIOZRC20): Promise<MsgRegisterAIOZRC20Response> {
    const data = MsgRegisterAIOZRC20.encode(request).finish();
    const promise = this.rpc.request("aioz.aiozrc20.v1.Msg", "RegisterAIOZRC20", data);
    return promise.then((data) => MsgRegisterAIOZRC20Response.decode(new BinaryReader(data)));
  }
  ToggleTokenPairConversion(
    request: MsgToggleTokenPairConversion,
  ): Promise<MsgToggleTokenPairConversionResponse> {
    const data = MsgToggleTokenPairConversion.encode(request).finish();
    const promise = this.rpc.request("aioz.aiozrc20.v1.Msg", "ToggleTokenPairConversion", data);
    return promise.then((data) => MsgToggleTokenPairConversionResponse.decode(new BinaryReader(data)));
  }
  UpdateTokenPair(request: MsgUpdateTokenPair): Promise<MsgUpdateTokenPairResponse> {
    const data = MsgUpdateTokenPair.encode(request).finish();
    const promise = this.rpc.request("aioz.aiozrc20.v1.Msg", "UpdateTokenPair", data);
    return promise.then((data) => MsgUpdateTokenPairResponse.decode(new BinaryReader(data)));
  }
  SetConverterAddress(request: MsgSetConverterAddress): Promise<MsgSetConverterAddressResponse> {
    const data = MsgSetConverterAddress.encode(request).finish();
    const promise = this.rpc.request("aioz.aiozrc20.v1.Msg", "SetConverterAddress", data);
    return promise.then((data) => MsgSetConverterAddressResponse.decode(new BinaryReader(data)));
  }
}
