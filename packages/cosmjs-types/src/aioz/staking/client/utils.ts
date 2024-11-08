/* eslint-disable */
import { MsgCreateValidator } from "../../../cosmos/staking/v1beta1/tx";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "aioz.staking.client";
export interface CreateValidatorProposalJSON {
  title: string;
  description: string;
  validator: MsgCreateValidator;
  deposit: string;
}
function createBaseCreateValidatorProposalJSON(): CreateValidatorProposalJSON {
  return {
    title: "",
    description: "",
    validator: MsgCreateValidator.fromPartial({}),
    deposit: "",
  };
}
export const CreateValidatorProposalJSON = {
  typeUrl: "/aioz.staking.client.CreateValidatorProposalJSON",
  encode(message: CreateValidatorProposalJSON, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number): CreateValidatorProposalJSON {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
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
    const obj = createBaseCreateValidatorProposalJSON();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.validator)) obj.validator = MsgCreateValidator.fromJSON(object.validator);
    if (isSet(object.deposit)) obj.deposit = String(object.deposit);
    return obj;
  },
  toJSON(message: CreateValidatorProposalJSON): JsonSafe<CreateValidatorProposalJSON> {
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
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = MsgCreateValidator.fromPartial(object.validator);
    }
    message.deposit = object.deposit ?? "";
    return message;
  },
};
