/* eslint-disable */
import { Duration } from "../../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "bech32ibc.bech32ibc.v1beta1";
/**
 * UpdateHrpIBCRecordProposal is a gov Content type for adding a new record
 * between a bech32 prefix and an IBC (port, channel).
 * It can be used to add a new record to the set. It can also be
 * used to update the IBC channel to associate with a specific denom. If channel
 * is set to "", it will remove the record from the set.
 */
export interface UpdateHrpIbcChannelProposal {
  title: string;
  description: string;
  hrp: string;
  sourceChannel: string;
  icsToHeightOffset: bigint;
  icsToTimeOffset: Duration;
}
function createBaseUpdateHrpIbcChannelProposal(): UpdateHrpIbcChannelProposal {
  return {
    title: "",
    description: "",
    hrp: "",
    sourceChannel: "",
    icsToHeightOffset: BigInt(0),
    icsToTimeOffset: Duration.fromPartial({}),
  };
}
export const UpdateHrpIbcChannelProposal = {
  typeUrl: "/bech32ibc.bech32ibc.v1beta1.UpdateHrpIbcChannelProposal",
  encode(message: UpdateHrpIbcChannelProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.hrp !== "") {
      writer.uint32(26).string(message.hrp);
    }
    if (message.sourceChannel !== "") {
      writer.uint32(34).string(message.sourceChannel);
    }
    if (message.icsToHeightOffset !== BigInt(0)) {
      writer.uint32(40).uint64(message.icsToHeightOffset);
    }
    if (message.icsToTimeOffset !== undefined) {
      Duration.encode(message.icsToTimeOffset, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): UpdateHrpIbcChannelProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateHrpIbcChannelProposal();
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
          message.hrp = reader.string();
          break;
        case 4:
          message.sourceChannel = reader.string();
          break;
        case 5:
          message.icsToHeightOffset = reader.uint64();
          break;
        case 6:
          message.icsToTimeOffset = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpdateHrpIbcChannelProposal {
    const obj = createBaseUpdateHrpIbcChannelProposal();
    if (isSet(object.title)) obj.title = String(object.title);
    if (isSet(object.description)) obj.description = String(object.description);
    if (isSet(object.hrp)) obj.hrp = String(object.hrp);
    if (isSet(object.sourceChannel)) obj.sourceChannel = String(object.sourceChannel);
    if (isSet(object.icsToHeightOffset)) obj.icsToHeightOffset = BigInt(object.icsToHeightOffset.toString());
    if (isSet(object.icsToTimeOffset)) obj.icsToTimeOffset = Duration.fromJSON(object.icsToTimeOffset);
    return obj;
  },
  toJSON(message: UpdateHrpIbcChannelProposal): JsonSafe<UpdateHrpIbcChannelProposal> {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.hrp !== undefined && (obj.hrp = message.hrp);
    message.sourceChannel !== undefined && (obj.sourceChannel = message.sourceChannel);
    message.icsToHeightOffset !== undefined &&
      (obj.icsToHeightOffset = (message.icsToHeightOffset || BigInt(0)).toString());
    message.icsToTimeOffset !== undefined &&
      (obj.icsToTimeOffset = message.icsToTimeOffset ? Duration.toJSON(message.icsToTimeOffset) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<UpdateHrpIbcChannelProposal>, I>>(
    object: I,
  ): UpdateHrpIbcChannelProposal {
    const message = createBaseUpdateHrpIbcChannelProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.hrp = object.hrp ?? "";
    message.sourceChannel = object.sourceChannel ?? "";
    if (object.icsToHeightOffset !== undefined && object.icsToHeightOffset !== null) {
      message.icsToHeightOffset = BigInt(object.icsToHeightOffset.toString());
    }
    if (object.icsToTimeOffset !== undefined && object.icsToTimeOffset !== null) {
      message.icsToTimeOffset = Duration.fromPartial(object.icsToTimeOffset);
    }
    return message;
  },
};
