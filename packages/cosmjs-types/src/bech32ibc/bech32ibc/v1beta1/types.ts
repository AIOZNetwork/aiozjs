/* eslint-disable */
import { Duration } from "../../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, DeepPartial, Exact } from "../../../helpers";
import { JsonSafe } from "../../../json-safe";
export const protobufPackage = "bech32ibc.bech32ibc.v1beta1";
/**
 * An HrpIbcRecord maps a bech32 human-readable prefix to an IBC source
 * channel
 */
export interface HrpIbcRecord {
  /** The bech32 human readable prefix that serves as the key */
  hrp: string;
  /** the channel by which the packet will be sent */
  sourceChannel: string;
  icsToHeightOffset: bigint;
  icsToTimeOffset: Duration;
}
function createBaseHrpIbcRecord(): HrpIbcRecord {
  return {
    hrp: "",
    sourceChannel: "",
    icsToHeightOffset: BigInt(0),
    icsToTimeOffset: Duration.fromPartial({}),
  };
}
export const HrpIbcRecord = {
  typeUrl: "/bech32ibc.bech32ibc.v1beta1.HrpIbcRecord",
  encode(message: HrpIbcRecord, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hrp !== "") {
      writer.uint32(10).string(message.hrp);
    }
    if (message.sourceChannel !== "") {
      writer.uint32(18).string(message.sourceChannel);
    }
    if (message.icsToHeightOffset !== BigInt(0)) {
      writer.uint32(24).uint64(message.icsToHeightOffset);
    }
    if (message.icsToTimeOffset !== undefined) {
      Duration.encode(message.icsToTimeOffset, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): HrpIbcRecord {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHrpIbcRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hrp = reader.string();
          break;
        case 2:
          message.sourceChannel = reader.string();
          break;
        case 3:
          message.icsToHeightOffset = reader.uint64();
          break;
        case 4:
          message.icsToTimeOffset = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): HrpIbcRecord {
    const obj = createBaseHrpIbcRecord();
    if (isSet(object.hrp)) obj.hrp = String(object.hrp);
    if (isSet(object.sourceChannel)) obj.sourceChannel = String(object.sourceChannel);
    if (isSet(object.icsToHeightOffset)) obj.icsToHeightOffset = BigInt(object.icsToHeightOffset.toString());
    if (isSet(object.icsToTimeOffset)) obj.icsToTimeOffset = Duration.fromJSON(object.icsToTimeOffset);
    return obj;
  },
  toJSON(message: HrpIbcRecord): JsonSafe<HrpIbcRecord> {
    const obj: any = {};
    message.hrp !== undefined && (obj.hrp = message.hrp);
    message.sourceChannel !== undefined && (obj.sourceChannel = message.sourceChannel);
    message.icsToHeightOffset !== undefined &&
      (obj.icsToHeightOffset = (message.icsToHeightOffset || BigInt(0)).toString());
    message.icsToTimeOffset !== undefined &&
      (obj.icsToTimeOffset = message.icsToTimeOffset ? Duration.toJSON(message.icsToTimeOffset) : undefined);
    return obj;
  },
  fromPartial<I extends Exact<DeepPartial<HrpIbcRecord>, I>>(object: I): HrpIbcRecord {
    const message = createBaseHrpIbcRecord();
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
