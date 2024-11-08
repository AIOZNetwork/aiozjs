/* eslint-disable */
import { Params } from "./staking";
import { MsgCreateValidator } from "../../../cosmos/staking/v1beta1/tx";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact, Rpc } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "aioz.staking.v1beta1";
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: aioz 1.5
 */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/mint parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: aioz 1.5
 */
export interface MsgUpdateParamsResponse {}
/**
 * MsgProposeValidator
 *
 * Since: aioz 1.5
 */
export interface MsgProposeValidator {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  validator: MsgCreateValidator;
}
/**
 * MsgProposeValidatorResponse
 *
 * Since: aioz 1.5
 */
export interface MsgProposeValidatorResponse {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({}),
  };
}
export const MsgUpdateParams = {
  typeUrl: "/aioz.staking.v1beta1.MsgUpdateParams",
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
  typeUrl: "/aioz.staking.v1beta1.MsgUpdateParamsResponse",
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
function createBaseMsgProposeValidator(): MsgProposeValidator {
  return {
    authority: "",
    validator: MsgCreateValidator.fromPartial({}),
  };
}
export const MsgProposeValidator = {
  typeUrl: "/aioz.staking.v1beta1.MsgProposeValidator",
  encode(message: MsgProposeValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.validator !== undefined) {
      MsgCreateValidator.encode(message.validator, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgProposeValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.validator = MsgCreateValidator.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgProposeValidator {
    const obj = createBaseMsgProposeValidator();
    if (isSet(object.authority)) obj.authority = String(object.authority);
    if (isSet(object.validator)) obj.validator = MsgCreateValidator.fromJSON(object.validator);
    return obj;
  },
  toJSON(message: MsgProposeValidator): JsonSafe<MsgProposeValidator> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.validator !== undefined &&
      (obj.validator = message.validator ? MsgCreateValidator.toJSON(message.validator) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgProposeValidator>, I>>(object: I): MsgProposeValidator {
    const message = createBaseMsgProposeValidator();
    message.authority = object.authority ?? "";
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = MsgCreateValidator.fromPartial(object.validator);
    }
    return message;
  },
};
function createBaseMsgProposeValidatorResponse(): MsgProposeValidatorResponse {
  return {};
}
export const MsgProposeValidatorResponse = {
  typeUrl: "/aioz.staking.v1beta1.MsgProposeValidatorResponse",
  encode(_: MsgProposeValidatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgProposeValidatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeValidatorResponse();
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
  fromJSON(_: any): MsgProposeValidatorResponse {
    const obj = createBaseMsgProposeValidatorResponse();
    return obj;
  },
  toJSON(_: MsgProposeValidatorResponse): JsonSafe<MsgProposeValidatorResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<MsgProposeValidatorResponse>, I>>(
    _: I,
  ): MsgProposeValidatorResponse {
    const message = createBaseMsgProposeValidatorResponse();
    return message;
  },
};
/** Msg defines the staking Msg service. */
export interface Msg {
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  ProposeValidator(request: MsgProposeValidator): Promise<MsgProposeValidatorResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UpdateParams = this.UpdateParams.bind(this);
    this.ProposeValidator = this.ProposeValidator.bind(this);
  }
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Msg", "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  ProposeValidator(request: MsgProposeValidator): Promise<MsgProposeValidatorResponse> {
    const data = MsgProposeValidator.encode(request).finish();
    const promise = this.rpc.request("aioz.staking.v1beta1.Msg", "ProposeValidator", data);
    return promise.then((data) => MsgProposeValidatorResponse.decode(new BinaryReader(data)));
  }
}
