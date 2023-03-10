/* eslint-disable */
import { MsgCreateValidator } from "../../../cosmos/staking/v1beta1/tx";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "aioz.staking.client";
export interface CreateValidatorProposalJSON {
  title: string;
  description: string;
  validator?: MsgCreateValidator;
  deposit: string;
}

function createBaseCreateValidatorProposalJSON(): CreateValidatorProposalJSON {
  return {
    title: "",
    description: "",
    validator: undefined,
    deposit: "",
  };
}

export const CreateValidatorProposalJSON = {
  encode(message: CreateValidatorProposalJSON, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }

    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }

    if (message.validator !== undefined) {
      MsgCreateValidator.encode(message.validator, writer.uint32(26).fork()).ldelim();
    }

    if (message.deposit !== "") {
      writer.uint32(34).string(message.deposit);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateValidatorProposalJSON {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateValidatorProposalJSON();

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

        case 4:
          message.deposit = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): CreateValidatorProposalJSON {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      validator: isSet(object.validator) ? MsgCreateValidator.fromJSON(object.validator) : undefined,
      deposit: isSet(object.deposit) ? String(object.deposit) : "",
    };
  },

  toJSON(message: CreateValidatorProposalJSON): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.validator !== undefined &&
      (obj.validator = message.validator ? MsgCreateValidator.toJSON(message.validator) : undefined);
    message.deposit !== undefined && (obj.deposit = message.deposit);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateValidatorProposalJSON>, I>>(
    object: I,
  ): CreateValidatorProposalJSON {
    const message = createBaseCreateValidatorProposalJSON();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? MsgCreateValidator.fromPartial(object.validator)
        : undefined;
    message.deposit = object.deposit ?? "";
    return message;
  },
};
