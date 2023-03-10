/* eslint-disable */
import { MsgCreateValidator } from "../../../cosmos/staking/v1beta1/tx";
import * as _m0 from "protobufjs/minimal";
import { isSet, DeepPartial, Exact } from "../../../helpers";
export const protobufPackage = "aioz.staking.v1beta1";
/** ParameterChangeProposal defines a proposal to change one or more parameters. */

export interface CreateValidatorProposal {
  title: string;
  description: string;
  validator?: MsgCreateValidator;
}

function createBaseCreateValidatorProposal(): CreateValidatorProposal {
  return {
    title: "",
    description: "",
    validator: undefined,
  };
}

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
    const message = createBaseCreateValidatorProposal();

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
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      validator: isSet(object.validator) ? MsgCreateValidator.fromJSON(object.validator) : undefined,
    };
  },

  toJSON(message: CreateValidatorProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.validator !== undefined &&
      (obj.validator = message.validator ? MsgCreateValidator.toJSON(message.validator) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateValidatorProposal>, I>>(object: I): CreateValidatorProposal {
    const message = createBaseCreateValidatorProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? MsgCreateValidator.fromPartial(object.validator)
        : undefined;
    return message;
  },
};
