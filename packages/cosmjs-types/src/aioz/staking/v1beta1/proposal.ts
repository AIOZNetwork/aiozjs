/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { MsgCreateValidator } from "../../../cosmos/staking/v1beta1/tx";

export const protobufPackage = "aioz.staking.v1beta1";

/** ParameterChangeProposal defines a proposal to change one or more parameters. */
export interface CreateValidatorProposal {
  title: string;
  description: string;
  validator?: MsgCreateValidator;
}

const baseCreateValidatorProposal: object = { title: "", description: "" };

export const CreateValidatorProposal = {
  encode(message: CreateValidatorProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.validator !== undefined) {
      MsgCreateValidator.encode(message.validator, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateValidatorProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateValidatorProposal } as CreateValidatorProposal;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.validator = MsgCreateValidator.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateValidatorProposal {
    const message = { ...baseCreateValidatorProposal } as CreateValidatorProposal;
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = MsgCreateValidator.fromJSON(object.validator);
    } else {
      message.validator = undefined;
    }
    return message;
  },

  toJSON(message: CreateValidatorProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.validator !== undefined &&
      (obj.validator = message.validator ? MsgCreateValidator.toJSON(message.validator) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<CreateValidatorProposal>): CreateValidatorProposal {
    const message = { ...baseCreateValidatorProposal } as CreateValidatorProposal;
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = MsgCreateValidator.fromPartial(object.validator);
    } else {
      message.validator = undefined;
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
